import { useState } from "react";

function StudentForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    year: 0,
    term: 0,
    ID: "",
    Session: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://ice-ps2h27s05-sajib-baruas-projects.vercel.app/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        // Successful submission
        console.log("Student data submitted successfully!");
      } else {
        // Handle errors
        console.error("Error submitting student data.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="year">Year</label>
        <input
          type="number"
          id="year"
          name="year"
          value={formData.year}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="term">Term</label>
        <input
          type="number"
          id="term"
          name="term"
          value={formData.term}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="ID">ID</label>
        <input
          type="text"
          id="ID"
          name="ID"
          value={formData.ID}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="Session">Session</label>
        <input
          type="text"
          id="Session"
          name="Session"
          value={formData.Session}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

export default StudentForm;
