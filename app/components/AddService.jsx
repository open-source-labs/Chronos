import React, { useState, useContext, useEffect } from 'react';
import SetupContext from '../context/SetupContext';
import '../stylesheets/AddService.css';

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

  // it is setting the dbState
  useEffect(() => {
    setDbType(document.getElementById('dbType').value);
  }, [dbState, setDbType]);

  const tooltipWriteup = `Chronos utilizes user-owned databases to store communications and system health data.
    Please enter a valid connection string to a SQL or noSQL database to begin monitoring.`;

  return (
    <div className="mainContainer">
      <h2 className="signUpHeader">
        Enter Your Database Information
      </h2>
      <form className="inputForm">
        Database Type:
        <select id="dbType" onChange={() => setDbType(document.getElementById('dbType').value)}>
          <option value="SQL">SQL</option>
          <option value="MongoDB">MongoDB</option>
        </select>
        Database URI:
        <input
          className="userInput"
          id="dburi"
          onChange={(e) => setUri(e.target.value)}
          placeholder="Database URI"
        />
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
