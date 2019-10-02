import React, { useState, useContext } from 'react';
import logo from '../assets/logo2.png';
import SetupContext from '../context/SetupContext';
import ServicesDashboard from './ServicesDashboard.jsx';

const { ipcRenderer } = window.require('electron');

const AddService = () => {
  const ChronosSetup = useContext(SetupContext);
  const [dbState, setDbType] = useState('SQL');
  const [uriState, setUri] = useState('');
  const [labelState, setLabel] = useState('');

  const onSubmit = () => {
    const userSettings = [labelState, dbState, uriState];
    // IPC communication used to update settings JSON with user input.
    ipcRenderer.send('submit', JSON.stringify(userSettings));
    ChronosSetup.setupRequired = ChronosSetup.toggleSetup(true);
    setDbType('rerender');
    document.location.reload();
  };

  if (!ChronosSetup.setupRequired) return React.lazy(<ServicesDashboard />);
  return (
    <div className="mainContainer">
      <img src={logo} alt="logo" />
      <h2 className="signUpHeader">Enter Your Database Information</h2>
      <form>
        Database Type:
        <select value={dbState} onChange={(e) => setDbType(e.target.value)}>
          <option value="SQL">SQL</option>
          <option value="MongoDB">MongoDB</option>
        </select>
        Database URI:
        <input
          className="userInput"
          onChange={(e) => setUri(e.target.value)}
          placeholder="Database URI"
        />
        Database Name:
        <input
          className="userInput"
          onChange={(e) => setLabel(e.target.value)}
          type="text"
          placeholder="Database Name"
        />
      </form>
      <button className="submitBtn" type="submit" onClick={onSubmit}>
        SUBMIT
      </button>
    </div>
  );
};

export default AddService;
