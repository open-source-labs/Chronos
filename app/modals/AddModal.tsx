import React, { useState, useContext } from 'react';
import { DashboardContext } from '../context/DashboardContext';
import '../stylesheets/AddModal.scss';

interface IFields {
  database: string;
  URI: string;
  name: string;
  description: string;
}

interface IDashboard {
  addApp: (fields: IFields) => void;
}

interface AddModalProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

type InputElement = React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>;
type FormElement = React.FormEvent<HTMLFormElement>;

const AddModal: React.FC<AddModalProps> = React.memo(({ setOpen }) => {
  const { addApp }: IDashboard = useContext(DashboardContext);

  const [fields, setFields] = useState<IFields>({
    database: 'SQL',
    URI: '',
    name: '',
    description: '',
  });

  // Submit form data and save to database
  const handleSubmit = (event: FormElement) => {
    event.preventDefault();
    addApp(fields);
    setOpen(false); // Close modal on submit
  };

  // Handle form changes
  const handleChange = (event: InputElement) => {
    const { name, value } = event.target;
    setFields({
      ...fields,
      [name]: value,
    });
  };

  const { database, URI, name, description } = fields;

  return (
    <div className="add-container">
      <div className="add-header">
        <h2>Add an Application</h2>
        <p>Enter the database information used to track the service</p>
      </div>
      <form onSubmit={handleSubmit}>
        <p>Required*</p>
        <div>
          <label htmlFor="db-type">
            Type<span>*</span>
          </label>
          <select id="db-type" name="database" value={database} onChange={e => handleChange(e)}>
            <option value="SQL">SQL</option>
            <option value="MongoDB">MongoDB</option>
          </select>
        </div>
        <div>
          <label htmlFor="db-uri">
            URI<span>*</span>
          </label>
          <input
            id="db-uri"
            name="URI"
            value={URI}
            onChange={e => handleChange(e)}
            placeholder="Database URI"
            required
          />
        </div>
        <div>
          <label htmlFor="db-name">
            Name<span>*</span>
          </label>
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
        <div>
          <label htmlFor="db-desc">Description</label>
          <textarea
            id="db-desc"
            name="description"
            value={description}
            onChange={e => handleChange(e)}
            placeholder="Add a short description"
          />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
});

export default AddModal;
