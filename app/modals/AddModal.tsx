/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useContext, useCallback } from 'react';
import { DashboardContext } from '../context/DashboardContext';
import '../stylesheets/AddModal.scss';

import { TModalSetter } from '../components/Occupied/types/Occupied';

interface IFields {
  typeOfService: string;
  database: string;
  URI: string;
  name: string;
  description: string;
}

interface IDashboard {
  addApp: (fields: IFields) => void;
  setApplications: any;
}

type InputElement = React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>;
type FormElement = React.FormEvent<HTMLFormElement>;

const AddModal: React.FC<TModalSetter> = React.memo(({ setModal }) => {
  const { addApp }: IDashboard = useContext(DashboardContext);

  const [fields, setFields] = useState<IFields>({
    typeOfService: 'Docker',
    database: 'SQL',
    URI: '',
    name: '',
    description: '',
  });

  // Submit form data and save to database
  const handleSubmit = (event: FormElement) => {
    event.preventDefault();
    // const newApp = [name, database, URI, description, typeOfService];
    // setApplications(prev => [...prev, ...newApp])
    addApp(fields);
    setModal({isOpen:false,type:''})
  };

  // Handle form changes
  const handleChange = (event: InputElement) => {
    const { name, value } = event.target;
    setFields({
      ...fields,
      [name]: value,
    });
  };

  const { typeOfService, database, URI, name, description } = fields;

  return (
    <div className="add-container">
      <div className="add-header">
        <h2>Add an Application</h2>
        <p>Enter the database information used to track the service</p>
      </div>
      <form onSubmit={handleSubmit}>
        <p>Required*</p>
        <div>
          <label htmlFor="serv-type">
            Type of Service<span>*</span>
          </label>
          <select
            id="serv-type"
            name="typeOfService"
            value={typeOfService}
            onChange={e => handleChange(e)}
          >
            <option value="Docker">Docker</option>
            <option value="gRPC">gRPC</option>
            <option value="Kubernetes">Kubernetes</option>
            <option value="Microservices">Microservices</option>
          </select>
        </div>
        <div>
          <label htmlFor="db-type">
            Type of Database<span>*</span>
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
            placeholder="Add a name for your new service"
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
