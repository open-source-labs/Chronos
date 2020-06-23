import React, { createContext } from 'react';

const { ipcRenderer } = window.require('electron');

export const ApplicationContext = createContext();

const ApplicationContextProvider = ({ children }) => {
  const connectToDB = index => {
    ipcRenderer.send('connect', index);
  };
  return (
    <ApplicationContext.Provider value={{ connectToDB }}>{children}</ApplicationContext.Provider>
  );
};

export default ApplicationContextProvider;
