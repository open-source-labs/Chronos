import React, { useState, useContext, useEffect } from 'react';
import logo from '../assets/logo2.png';
import SetupContext from '../context/SetupContext';
import ServicesDashboard from './ServicesDashboard.jsx';

const { ipcRenderer } = window.require('electron');

const AddService = () => {
  // Context used to ensure that that this page is only seen when the setup is required. Updated when user adds a database.
  const ChronosSetup = useContext(SetupContext);
  
  // Local state created for form entries ONLY.
  const [dbState, setDbType] = useState('');
  const [uriState, setUri] = useState('');
  const [labelState, setLabel] = useState('');

  // Submits data provided by the user to added to the setting file.
  const onSubmit = () => {
    const userSettings = [labelState, dbState, uriState];

    // IPC communication used to update settings JSON with user input.
    ipcRenderer.send('submit', JSON.stringify(userSettings));
    ChronosSetup.setupRequired = ChronosSetup.toggleSetup(true);
    // Refresh window after submit.
    document.location.reload();
  };
  //it is setting the dbState
   useEffect(()=>{
     setDbType(document.getElementById('dbType').value)
    },[dbState, setDbType])


  return (
    <div className="mainContainer">
      <img src={logo} alt="logo" />
      <h2 className="signUpHeader">Enter Your Database Information</h2>
      <form>
        Database Type:
        {/* the select e.target.value of onchange is reading the value SQL and MongDB, the value the setState is delay by one action. Stack Over Flow says the action is an async call so dbState is updated late. So I did another setDbtype callwith useEffect*/}
        <select id="dbType" onChange={()=>setDbType(document.getElementById('dbType').value)}>
          <option value="SQL">SQL</option>
          <option value="MongoDB">MongoDB</option>
        </select>
        Database URI:
        {/* This is where the uri value is set with setUri */}
        <input
          className="userInput"
          id="dburi"
          onChange={(e) => setUri(e.target.value)}
          placeholder="Database URI"
        />
        {/* This is where the name of the database is set with setLabel */}
        Database Name:
        <input
          className="userInput"
          id="dbname"
          onChange={(e) => setLabel(e.target.value)}
          type="text"
          placeholder="Database Name"
        />
        <button
          className="submitBtn"
          type="submit"
          // Error Handling.
          onClick={() => {
            if (
              document.getElementById('dburi').value === ''
              || document.getElementById('dbname').value === ''
            ) {
              alert(
                'Required field missing. Please verify you provided both required items and resubmit form',
              );
            } else {
              onSubmit();
            }
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddService;
