// components/UpdateAdminForm.js

import React, { useState } from 'react';

const UpdateAdminForm = () => {
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const handleUpdateAdmin = async () => {
    try {
      const response = await fetch('http://localhost:5000/updateAdminStatus', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, isAdmin }),
      });

      const data = await response.json();
      console.log(data.message);
      console.log(data); // Updated user object

    } catch (error) {
      console.error('Error updating admin status:', error);
    }
  };

  return (
    <div>
      <h1>Update Admin Status</h1>
      <form>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <br />
        <label>Is Admin:</label>
        <input type="checkbox" checked={isAdmin} onChange={() => setIsAdmin(!isAdmin)} />
        <br />
        <button type="button" onClick={handleUpdateAdmin}>Update Admin Status</button>
      </form>
    </div>
  );
};

export default UpdateAdminForm;
