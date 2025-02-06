/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useContext, useCallback } from 'react';
import { DashboardContext } from '../../context/DashboardContext';
import './AddModal.scss';
import { TModalSetter } from '../../components/Occupied/types/Occupied';
import ServiceDBType from './ServiceDBType';
import ServicesDescription from './ServicesDescription';

interface IFields {
  typeOfService: string;
  database: string;
  URI: string;
  name: string;
  description: string;
}

interface IDashboard {
  addApp: (fields:any) => void;
  setApplications: any;
}

type InputElement = React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>;
type FormElement = React.FormEvent<HTMLFormElement>;

const AddModal: React.FC<TModalSetter> = React.memo(({ setModal }) => {
  const { addApp }: IDashboard = useContext(DashboardContext);

  const [fields, setFields] = useState<any>({
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
    addApp({fields});
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
        <ServiceDBType typeOfService={typeOfService} handleChange={handleChange} database={database}/>
        <ServicesDescription URI={URI} name={name} description={description} handleChange={handleChange}/>
        <button>Submit</button>
      </form>
    </div>
  );
});

export default AddModal;
