import { useState, useEffect } from 'react'
// import UpdateTeacherCourses from './UpdateTeacherCourses.jsx'
// import CourseDetailsForm from './courseDetailsForm.jsx';
// import RoutineTable from './routineTable.jsx';
// import StudentLogin from './studenLogin.jsx';
// import SingleRoutine from './singleRoutine.jsx';
import ExamCommittee from './examCommittee.jsx';

function App() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        codeName: "",
        email: "",
        courses: [],
    });
      
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
    
        try {
            const result = await fetch('http://localhost:5000/teachers', {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (result.ok) {
                // Successfully saved
                alert("Data saved successfully");
            } else {
                const errorMessage = await result.text(); // Get the error message
                console.error('Error:', errorMessage);
                alert("Error: " + errorMessage);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

    const [response, setResponse] = useState([]);
    useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:5000/teachers');
            const data = await response.json();
            setResponse(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
    }, []);
    return (
        <>
            <h1>This is React WebApp </h1>
            <form action="">
                <input type="text" placeholder="first name"
                value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value})} />
                <input type="text" placeholder="last name"
                value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value})} />

                <input type="email" placeholder="email"
                value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value})} />
                <input type="teacherCode" placeholder="teacher code"
                value={formData.teacherCode} onChange={(e) => setFormData({ ...formData, teacherCode: e.target.value})} />
                <button type="submit"
                onClick={handleOnSubmit}>submit</button>
            </form>

            <div>
                <h1>Response from server: {response.length}</h1>
            </div>

            {/* <UpdateTeacherCourses/>
            <CourseDetailsForm/>
            <RoutineTable/>
            <StudentLogin/>
            <SingleRoutine/> */}
            <ExamCommittee/>
        </>
    );
}
 
export default App;