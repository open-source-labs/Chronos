import React, { useState } from 'react';
// import ServiceOverview from './ServiceOverview.jsx';

const { ipcRenderer } = window.require('electron');

const LoadServices = () => {
  // const [appState, setAppState] = useState({});
  const appState = {};
  // IPC communication used to determine if the user has previously setup the app.
  const setup = JSON.parse(ipcRenderer.sendSync('state'));
  appState['setupRequired'] = setup;

  // IPC communication used to initiate query for information on microservices.
  ipcRenderer.send('overviewRequest');

  // IPC listener responsible for retrieving infomation from asynchronous main process message.
  ipcRenderer.on('overviewResponse', (event, data) => {
    // Adds microservice data to state.
    appState['microservice'] = [...Object.values(JSON.parse(data))];
  });

  return appState;
};

const chronosState = LoadServices();
console.log(chronosState);

export default React.createContext(chronosState.setupRequired);
// export default LoadServices;

  // SETUP
  // OVERVIEW 
    // --> names 
    // --> relationships

  // SERVICES
    // ---> service
      // ---> healthData
    // ---> service
      // ---> healthData
    // ---> service
      // ---> healthData

