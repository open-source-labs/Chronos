import React, { useState } from 'react';
import '../stylesheets/AddService.css';

const { ipcRenderer } = window.require('electron');

const AddService = () => {
  const [field, setField] = useState({
    database: 'SQL',
    URI: '',
    name: '',
  });

  // Submit form data and save to database
  const handleSubmit = e => {
    e.preventDefault();
    const { database, URI, name } = field;
    ipcRenderer.send('submit', JSON.stringify([name, database, URI]));

    // Refresh window after submit.
    document.location.reload();
  };

  // Handle form field changes
  const handleChange = event => {
    const { name, value } = event;
    setField({
      ...field,
      [name]: value,
    });
  };

  // const tooltipWriteup = `Chronos utilizes user-owned databases to store communications and system health data.
  //   Please enter a valid connection string to a SQL or noSQL database to begin monitoring.`;

  const { database, URI, name } = field;
  return (
    <div className="add-container">
      <h2>Enter Your Database Information</h2>
      <form onSubmit={handleSubmit}>
        Database Type:
        <select name="database" value={database} onChange={e => handleChange(e.target)}>
          <option value="SQL">SQL</option>
          <option value="MongoDB">MongoDB</option>
        </select>
        Database URI:
        <input
          name="URI"
          value={URI}
          onChange={e => handleChange(e.target)}
          placeholder="Database URI"
          required
        />
        Database Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={e => handleChange(e.target)}
          placeholder="Database Name"
          required
        />
        <button className="submitBtn">Submit</button>
      </form>
    </div>
  );
};

export default AddService;
