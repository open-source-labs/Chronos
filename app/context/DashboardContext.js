import React from 'react';

const { ipcRenderer } = window.require('electron');

// Contains an array of just the names of the databases saved by the user.
const DashboardContext = React.createContext(ipcRenderer.sendSync('dashboard'));

export const DashboardProvider = DashboardContext.Provider;
export const DashboardConsumer = DashboardContext.Consumer;
export default DashboardContext;
