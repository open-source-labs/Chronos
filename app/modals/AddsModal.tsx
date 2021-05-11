import React, { useState, useContext, useCallback } from 'react';
import { DashboardContext } from '../context/DashboardContext';
import '../stylesheets/AddsModal.scss';
import PersonIcon from '@material-ui/icons/Person';


interface IFields {
  // database: string;
  URI: string;
  name: string;
  // description: string;
}

// interface IDashboard {
//   addApp: (fields: IFields) => void;
// }

interface AddsModalProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

type InputElement = React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>;
type FormElement = React.FormEvent<HTMLFormElement>;

const AddsModal: React.FC<AddsModalProps> = React.memo(({ setOpen }) => {
//   const { addApp }: IDashboard = useContext(DashboardContext);

  const [fields, setFields] = useState<IFields>({
    // database: 'SQL',
    URI: '',
    name: '',
    // description: '',
  });

  // Submit form data and save to database
  const handleSubmit = (event: FormElement) => {
    // event.preventDefault();
    // addApp(fields);
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
  function myFunction() {
    location.replace("/")
  }
  
//uncomment below to bring back database, description-TG
  // const { database, URI, name, description } = fields;
  const { URI, name } = fields;

  return (
    <div className="add-container">
      <div className="add-header">
        <div><h2>Welcome Back</h2>   <PersonIcon className="navIcon" id="personIcon" /></div>
        
      </div>
      <form onSubmit={handleSubmit}>
       
      
        <div>
          <label htmlFor="db-uri">
            <span></span>
          </label>
       
        </div>
        <div>
        <label htmlFor="db-name">
           
            <p><h4>ACCESS LEVEL: </h4></p>
          </label>
         
        
        </div>
        <div>
      
        </div>
        <button>Cancel</button>
        <br></br>
        <button className="link" id="submitBtn" type="submit" onClick={myFunction}>Log Out</button>
    </form>
  </div>
  );
});

export default AddsModal;
