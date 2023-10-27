import "bootstrap/dist/css/bootstrap.css";
import "./ser1-style.css";
import { useState, useEffect } from 'react';

const RoutineTable = () => {
    const [routine, setRoutine] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modifiedRoutine, setModifiedRoutine] = useState([]);

    useEffect(() => {
        fetch('https://ice-9duauifmg-sajib-baruas-projects.vercel.app/routine')
          .then((response) => response.json())
          .then((data) => {
            setRoutine(data);
          })
          .catch((error) => console.error(error));
    }, []);
    
    useEffect(() => {
        toModifiedRoutine();
    }, [routine])
    
    const toModifiedRoutine = () => {
        if(routine.length === 0) return;

        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
        const yearTerms = [ [1, 2], [2, 2], [3, 2], [4, 2] ];
        var onlyFirstTime = true; var routineModified = [];
        for(let day = 0; day < days.length; day++) {
            for(let yearTerm = 0; yearTerm < yearTerms.length; yearTerm++) {
                const year = yearTerms[yearTerm][0], term = yearTerms[yearTerm][1];

                var row = `<tr>
                <td rowSpan="5">
                  <strong><span className="vertical">${days[day]}</span></strong>
                </td>
                <td><span>Y-${year}, T-${term}</span></td>`
                for(let timeSlot = 0; timeSlot < 7; timeSlot++) {
                    if(onlyFirstTime && timeSlot === 5) {
                        row = row + `
                        <td rowSpan="25" className="vertical">Lunch Break</td>`;
                        onlyFirstTime = false;
                    }

                    const block = routine[0].overall[day][year][term][timeSlot];

                    if(block.isAllocated) {
                        row = row + `
                        <td>
                            ${block.course.code} <br/>
                            ${block.teacher.teacherCode} <br/>
                            ${block.room}
                        </td>`;
                    } else {
                        row = row + `
                        <td> </td>`
                    }
                }

                row = row + `
                <tr/>`;
                routineModified.push(row);

                console.log(row);
            }
        }
        setModifiedRoutine(routineModified);
    }

    const generateRoutine = () => {
        setLoading(true);

        fetch("https://ice-9duauifmg-sajib-baruas-projects.vercel.app/generateRandomRoutine")
        .then(() =>  {
            setLoading(false);
        })
        .catch((error) => {
            console.error('Error fetching routine:', error);
            setLoading(false);
        });

        toModifiedRoutine();
    };
  return (
    <>
        <button onClick={generateRoutine}>Re-order Routine</button>
        {loading ? (
        <p>Loading...</p>
        ) : (
        <table className="routine-table">
            <tr>
              <td className="routine-header-tr">Day</td>
              <td className="routine-header-tr">Term,Year</td>
              <td className="routine-header-tr">9:00-9:45</td>
              <td className="routine-header-tr">9:50-10:35</td>
              <td className="routine-header-tr">10:40-11:25</td>
              <td className="routine-header-tr">11:30-12:15PM</td>
              <td className="routine-header-tr">12:15-1:00PM</td>
              <td className="routine-header-tr">1:00-2:00PM</td>
              <td className="routine-header-tr">2:00-2:50PM</td>
              <td className="routine-header-tr">2:55-3:45PM</td>
            </tr>

            {
                modifiedRoutine.map((item) => ({item}))
            }
        </table>
        )}
    </>
  );
};

export default RoutineTable;