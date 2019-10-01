import React, { useState, useContext } from 'react';
import setup from './LoadServices.jsx';
import ServiceOverview from './ServiceOverview.jsx';

const { ipcRenderer } = window.require('electron');
// const uuidv1 = require('uuid/v1');

const SignUp = () => {
  const setupContext = useContext(setup);
  const [setupStatus, setStatus] = useState(setupContext);
  // Form state
  const [dbState, setDbType] = useState('');
  const [uriState, setUri] = useState();
  const [labelState, setLabel] = useState('');

  const onSubmit = () => {
    const userSettings = {
      setupRequired: false,
      services: [[labelState, dbState, uriState]],
    };
    // IPC communication used to update settings JSON with user input.
    const updatedStatus = ipcRenderer.sendSync('submit', JSON.stringify(userSettings));
    setStatus(updatedStatus);
  };
  if (!setupStatus) return <ServiceOverview />;
  return (
    <div>
      <h3>You are one checkbox and copy/paste away from easy microservice development!</h3>
      <form>
        Your database:
        <select value={dbState} onChange={(e) => setDbType(e.target.value)}>
          <option value="SQL">SQL</option>
          <option value="MongoDB">MongoDB</option>
        </select>
        <input onChange={(e) => setUri(e.target.value)} placeholder={uriState} />
        <br></br>
        Save as:
        <input onChange={(e) => setLabel(e.target.value)} type="text" placeholder={labelState} />
      </form>
      <button type="submit" onClick={onSubmit}>Submit</button>
    </div>
  );
};

// const SignUp = () => {
//   // Constructor function for form objects.
//   const BlankEntry = () => {
//     const entry = {
//       label: '',
//       url: '',
//       id: '',
//     };
//     return entry;
//   };

//   // Initial state
//   const startState = [new BlankEntry(), new BlankEntry(), new BlankEntry()];

//   // Local form state for microservice list
//   const [formState, setFormState] = useState(startState);

//   // Local from state for database
//   const [dbState, setdbState] = useState('');

//   // Adds additional input field to rendered sign up component
//   const addEntry = () => {
//     event.preventDefault();
//     setFormState([...formState, new BlankEntry()]);
//   };

//   // Removes input field to rendered sign up component
//   const deleteEntry = (id) => {
//     event.preventDefault();
//     const adjustedState = formState.filter((entry) => entry.id !== id);
//     setFormState([...adjustedState]);
//   };

//   // IPC communication used to update settings JSON with user input.
//   const onSubmit = () => {
//     const state = {
//       setupRequired: false,
//       services: formState,
//       database: dbState,
//     };
//     const updatedState = ipcRenderer.sendSync('submit', JSON.stringify(state));
//   };

//   return (
//     <div>
//       <h1>Setup Your Microservices</h1>
//       <form>
//         {/* Renders form state to the screen */}
//         {formState.map((val, idx) => {
//           // uuidv1: Creates a unique key ID for each element in form state.
//           // onChange: Allows state to be updated as the user types in the input fields.
//           // placeholder: Allows inputs to remain on the screen even as state updates.
//           const keyID = uuidv1();
//           val.id = keyID;
//           return (
//             <div key={`${keyID}`}>
//               <button listid={`${keyID}`} onClick={() => deleteEntry(keyID)}>
//                 X
//               </button>
//               <input
//                 onChange={(e) => {
//                   val.label = e.target.value;
//                 }}
//                 type="text"
//                 placeholder={val.label}
//               />
//               <input
//                 onChange={(e) => {
//                   val.url = e.target.value;
//                 }}
//                 type="text"
//                 placeholder={val.url}
//               />
//             </div>
//           );
//         })}
//         <input
//           onChange={(e) => {
//             setdbState(e.target.value);
//           }}
//           placeholder={dbState}
//         />
//         <br />
//         <button onClick={addEntry}>Add Service</button>
//         <button onClick={onSubmit}>Submit</button>
//       </form>
//     </div>
//   );
// };

export default SignUp;
