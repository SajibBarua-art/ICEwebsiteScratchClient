import React, { useState } from "react";

function CourseDistribution() {
  const [getExamYear, setGetExamYear] = useState("");
  const [getSemester, setGetSemester] = useState("");
  const [getResult, setGetResult] = useState("");

  const [postExamYear, setPostExamYear] = useState("");
  const [postSemester, setPostSemester] = useState("");
  const [postCourseDetails, setPostCourseDetails] = useState("");
  const [postResult, setPostResult] = useState("");

  const [updateExamYear, setUpdateExamYear] = useState("");
  const [updateSemester, setUpdateSemester] = useState("");
  const [updateNewCourseDetails, setUpdateNewCourseDetails] = useState("");
  const [updateResult, setUpdateResult] = useState("");

  const getData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/courseDistribution?examYear=${getExamYear}&semester=${getSemester}`
      );
      const data = await response.json();

      setGetResult(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("Error fetching data:", error);
      setGetResult("Error fetching data.");
    }
  };

  const postData = async () => {
    try {
      const response = await fetch("http://localhost:5000/courseDistribution", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          examYear: postExamYear,
          semester: postSemester,
          courseDetails: postCourseDetails.split(","),
        }),
      });

      const data = await response.json();

      setPostResult(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("Error creating course distribution:", error);
      setPostResult("Error creating course distribution.");
    }
  };

  const updateData = async () => {
    try {
      const response = await fetch("http://localhost:5000/courseDistribution/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          examYear: updateExamYear,
          semester: updateSemester,
          newCourseDetails: updateNewCourseDetails.split(","),
        }),
      });

      const data = await response.json();

      setUpdateResult(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error("Error updating course distribution:", error);
      setUpdateResult("Error updating course distribution.");
    }
  };

  return (
    <div>
      <h1>Course Distribution App</h1>

      <h2>Get Course Distribution</h2>
      <label>
        Exam Year:
        <input
          type="text"
          value={getExamYear}
          onChange={(e) => setGetExamYear(e.target.value)}
        />
      </label>
      <label>
        Semester:
        <input
          type="text"
          value={getSemester}
          onChange={(e) => setGetSemester(e.target.value)}
        />
      </label>
      <button onClick={getData}>Get Data</button>
      <pre>{getResult}</pre>

      <hr />

      <h2>Create Course Distribution</h2>
      <label>
        Exam Year:
        <input
          type="text"
          value={postExamYear}
          onChange={(e) => setPostExamYear(e.target.value)}
        />
      </label>
      <label>
        Semester:
        <input
          type="text"
          value={postSemester}
          onChange={(e) => setPostSemester(e.target.value)}
        />
      </label>
      <label>
        Course Details (comma-separated):
        <input
          type="text"
          value={postCourseDetails}
          onChange={(e) => setPostCourseDetails(e.target.value)}
        />
      </label>
      <button onClick={postData}>Create Course Distribution</button>
      <pre>{postResult}</pre>

      <hr />

      <h2>Update Course Distribution</h2>
      <label>
        Exam Year:
        <input
          type="text"
          value={updateExamYear}
          onChange={(e) => setUpdateExamYear(e.target.value)}
        />
      </label>
      <label>
        Semester:
        <input
          type="text"
          value={updateSemester}
          onChange={(e) => setUpdateSemester(e.target.value)}
        />
      </label>
      <label>
        New Course Details (comma-separated):
        <input
          type="text"
          value={updateNewCourseDetails}
          onChange={(e) => setUpdateNewCourseDetails(e.target.value)}
        />
      </label>
      <button onClick={updateData}>Update Course Distribution</button>
      <pre>{updateResult}</pre>
    </div>
  );
}

export default CourseDistribution;

// General structure example
// CourseDistribution = {
//     examYear: "2023", 
//     semester: "2",
//     courseDetails: [
//         {
//             courseCode: "2201",
//             teacherCode: ["ASL", "ARK"]
//         },
//         {
//             courseCode: "2203",
//             teacherCode: ["ARK, "SA"]
//         }
//     ]
// }