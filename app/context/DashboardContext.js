import React from 'react';

const { ipcRenderer } = window.require('electron');

const DashboardContext = React.createContext(ipcRenderer.sendSync('dashboard'));

export const DashboardProvider = DashboardContext.Provider;
export const DashboardConsumer = DashboardContext.Consumer;
export default DashboardContext;
