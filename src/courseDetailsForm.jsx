import { useState } from 'react';
import axios from 'axios';

function CourseDetailsForm() {
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    year: '',
    term: '',
    type: '',
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
      const response = await axios.post('http://localhost:5000/courseDetails', formData);
      console.log('Course details saved:', response.data);
      // Handle success or redirect to another page
    } catch (error) {
      console.error('Error saving course details:', error);
      // Handle error
    }
  };

  return (
    <div>
      <h1>Add Course Details</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="code">Code:</label>
          <input
            type="text"
            id="code"
            name="code"
            value={formData.code}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="credit">Credit:</label>
          <input
            type="number"
            id="credit"
            name="credit"
            value={formData.credit}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="year">Year:</label>
          <input
            type="number"
            id="year"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="term">Term:</label>
          <input
            type="number"
            id="term"
            name="term"
            value={formData.term}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="type">Type:</label>
          <input
            type="text"
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CourseDetailsForm;