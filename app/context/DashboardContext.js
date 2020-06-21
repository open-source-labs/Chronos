import React from 'react';

const { ipcRenderer } = window.require('electron');

// Contains an array of just the names of the databases saved by the user.
// Todo: Bring in the microservice id for keys in Microservice Component
const DashboardContext = React.createContext({
  applicationsList: ipcRenderer.sendSync('dashboard'),
});

export const DashboardProvider = DashboardContext.Provider;
export const DashboardConsumer = DashboardContext.Consumer;
export default DashboardContext;
