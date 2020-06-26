import React, { useState } from 'react';
import '../stylesheets/AddService.css';
const { ipcRenderer } = window.require('electron');

interface fields {
  database: string;
  URI: string;
  name: string;
}

const AddService: React.FC = () => {
  const [field, setField] = useState<fields>({
    database: 'SQL',
    URI: '',
    name: '',
  });

  // Submit form data and save to database
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { database, URI, name } = field;
    ipcRenderer.send('submit', JSON.stringify([name, database, URI]));

    // Refresh window after submit.
    document.location.reload();
  };

  // Handle form field changes
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = event.target;
    setField({
      ...field,
      [name]: value,
    });
  };

  const { database, URI, name } = field;
  return (
    <div className="add-container">
      <h2>Enter Your Database Information</h2>
      <form onSubmit={handleSubmit}>
        Database Type:
        <select name="database" value={database} onChange={(e) => handleChange(e)}>
          <option value="SQL">SQL</option>
          <option value="MongoDB">MongoDB</option>
        </select>
        Database URI:
        <input
          name="URI"
          value={URI}
          onChange={e => handleChange(e)}
          placeholder="Database URI"
          required
        />
        Database Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={e => handleChange(e)}
          placeholder="Database Name"
          required
        />
        <button className="submitBtn">Submit</button>
      </form>
    </div>
  );
};

export default AddService;
