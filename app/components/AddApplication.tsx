import React, { useState, useContext } from 'react';
import '../stylesheets/AddApplication.css';
import { DashboardContext } from '../context/DashboardContext';

interface IFields {
  database: string;
  URI: string;
  name: string;
}

interface IDashboard {
  addApp: (fields: IFields) => void
}

type InputElement = React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
type FormElement = React.FormEvent<HTMLFormElement>

const AddApplication: React.FC = () => {
  const { addApp }: IDashboard = useContext(DashboardContext);
  const [fields, setFields] = useState<IFields>({
    database: 'SQL',
    URI: '',
    name: '',
  });

  // Submit form data and save to database
  const handleSubmit = (event: FormElement) => {
    event.preventDefault();
    // Add new application
    addApp(fields);
  };

  // Handle form field changes
  const handleChange = (event: InputElement) => {
    const { name, value } = event.target;
    setFields({
      ...fields,
      [name]: value,
    });
  };

  const { database, URI, name } = fields;
  return (
    <div className="add-container">
      <h2>Enter Your Database Information</h2>
      <form onSubmit={handleSubmit}>
        Database Type:
        <select name="database" value={database} onChange={e => handleChange(e)}>
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

export default AddApplication;
