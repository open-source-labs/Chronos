import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import '../stylesheets/AddApplication.css';
import { DashboardContext } from '../context/DashboardContext';

interface IFields {
  database: string;
  URI: string;
  name: string;
}

interface IDashboard {
  addApp: (fields: IFields) => void;
}

type InputElement = React.ChangeEvent<HTMLSelectElement | HTMLInputElement>;
type FormElement = React.FormEvent<HTMLFormElement>;

const AddApplication: React.FC = () => {
  const { addApp }: IDashboard = useContext(DashboardContext);
  const [fields, setFields] = useState<IFields>({
    database: 'SQL',
    URI: '',
    name: '',
  });

  // Submit form data and save to database
  const handleSubmit = (event: FormElement) => {
    console.log('hey you submitted');
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
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <label htmlFor="db-type">Type: </label>
          <select id="db-type" name="database" value={database} onChange={e => handleChange(e)}>
            <option value="SQL">SQL</option>
            <option value="MongoDB">MongoDB</option>
          </select>
        </div>
        <div className="input-field">
          <label htmlFor="db-uri">URI</label>
          <input
            id="db-uri"
            name="URI"
            value={URI}
            onChange={e => handleChange(e)}
            placeholder="Database URI"
            required
          />
        </div>
        <div className="input-field">
          <label htmlFor="db-name">Name</label>
          <input
            id="db-name"
            type="text"
            name="name"
            value={name}
            onChange={e => handleChange(e)}
            placeholder="Database Name"
            required
          />
        </div>
        <button className="submitBtn">Submit</button>
      </form>
    </div>
  );
};


export default AddApplication;
