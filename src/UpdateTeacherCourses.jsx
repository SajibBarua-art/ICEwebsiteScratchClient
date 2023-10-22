import { useState } from 'react';

function UpdateTeacherCourses() {
  const [teacherCode, setTeacherId] = useState('');
  const [courses, setCourses] = useState('');

  async function updateTeacherCourses() {
    try {
      // Remove all whitespace (including spaces, tabs and newline characters) from the courses input
      const trimmedCourses = courses.replace(/\s/g, '');

      const response = await fetch(`http://localhost:5000/teachers/${teacherCode}/courses`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courses: trimmedCourses.split(',') }),
      });

      if (response.ok) {
        alert('Courses updated successfully');
      } else {
        const errorMessage = await response.text();
        alert(`Error: ${errorMessage}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  }

  return (
    <div>
      <h1>Update Teacher Courses</h1>
      <div>
        <label htmlFor="teacherCode">Teacher ID:</label>
        <input
          type="text"
          id="teacherCode"
          value={teacherCode}
          onChange={(e) => setTeacherId(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="courses">Courses (comma-separated):</label>
        <input
          type="text"
          id="courses"
          value={courses}
          onChange={(e) => setCourses(e.target.value)}
        />
      </div>
      <button onClick={updateTeacherCourses}>Update Courses</button>
    </div>
  );
}

export default UpdateTeacherCourses;
