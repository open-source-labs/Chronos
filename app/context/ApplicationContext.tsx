import React, { useState, createContext, Props } from 'react';
import Electron from 'electron';

const { ipcRenderer } = window.require('electron');

export const ApplicationContext = React.createContext<any>(null);

const ApplicationContextProvider: React.FC = ({ children }) => {
  const [servicesData, setServicesData] = useState([]);
  console.log('this is your children in application context:   ', children);
  /**
   * Connect to database provided by user at 'index'
   */
  const connectToDB = (index: number) => {
    if (index) ipcRenderer.send('connect', index);
  };
  /**
   * Fetch all microservices of a certain applications
   */
  const fetchServicesNames = (application: string) => {
    // Send Async Request
    ipcRenderer.send('servicesRequest', application);

    // Response
    ipcRenderer.on('servicesResponse', (event: Electron.Event, data) => {
      // Parse JSON response
      const result = JSON.parse(data);
      console.log('Number of data points (service):', result.length);

      // Set local state
      setServicesData(result);
    });
  };

  return (
    <ApplicationContext.Provider
      value={{ connectToDB, fetchServicesNames, setServicesData, servicesData }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export default ApplicationContextProvider;
