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
//uncomment below to bring back database, description-TG
  // const { database, URI, name, description } = fields;
  const { URI, name } = fields;

  return (
    <div className="add-container">
      <div className="add-header">
        <div><h2>Welcome Back</h2>   <PersonIcon className="navIcon" id="personIcon" /></div>
        
      </div>
      <form onSubmit={handleSubmit}>
        {/* <p>Required*</p> */}
        <div>
          {/* <label htmlFor="db-type">
            Type<span>*</span>
          </label> */}
          {/* <select id="db-type" name="database" value={database} onChange={e => handleChange(e)}>
            <option value="SQL">SQL</option>
            <option value="MongoDB">MongoDB</option>
          </select> */}
        </div>
        {/* <div>
          <label htmlFor="db-uri">
            EMAIL<span>*</span>
          </label>
          <input
             id="db-uri"
             name="URI"
             value={Email}
            onChange={e => handleChange(e)}
            placeholder="EMAIL ADDRESS"
            required
          />
        </div> */}
      
        <div>
          <label htmlFor="db-uri">
            <span></span>
          </label>
          {/* <input
            id="db-uri"
            name="URI"
            value={URI}
            onChange={e => handleChange(e)}
            placeholder="ENTER EMAIL ADDDRESS"
            required
          /> */}
        </div>
        <div>
        <label htmlFor="db-name">
           
            <p><h4>ACCESS LEVEL: </h4></p>
          </label>
         
          
          {/* <label htmlFor="db-name">
            PASSWORD<span>*</span>
          </label> */}
          {/* <input
            id="db-name"
            type="text"
            name="name"
            value={name}
            onChange={e => handleChange(e)}
            placeholder="ENTER PASSWORD"
            required
          /> */}
        </div>
        <div>
          {/* <label htmlFor="db-desc">Description</label>
          <textarea
            id="db-desc"
            name="description"
            value={description}
            onChange={e => handleChange(e)}
            placeholder="Add a short description"
          /> */}
        </div>
        <button>Cancel</button>
        <br></br>
        <button onClick={e =>(alert('Are you sure you want to log out?'))}>Log Out</button>
        {/* <!-- sign up with Google button --> */}
    {/* <div className="col-lg-14"> */}
      {/* <div className="card">
         <div className="card-body"> */}
          {/* href makes a request to the following path-->change as needed --> */}
          {/* <button className= 'googleL'>
          <a className="btn btn-block btn-social btn-google" href="/auth/google" role="button">
            <i className="fab fa-google"></i>
            Google Sign Up */}
          {/* </a>
          </button>
        </div> */}
       {/* </div>
      </div> */}
   
    {/* <div className="col-sm-10">
      <div className="card">
        <div className="card-body"> 
          <button className= 'googleS'>
          {/* <!-- href makes a request to the following path-->change as needed --> */}
          {/* <a className="btn btn-block btn-social btn-google" href="/auth/google" role="button">
            <i className="fab fa-google"></i>
            Google Sign In
          </a>
          </button>
        </div>
      </div>
    // </div> */} 
    
    </form>
  </div>
  );
});

export default AddsModal;
