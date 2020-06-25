import React, { useState, createContext } from 'react';

const { ipcRenderer } = window.require('electron');

export const ApplicationContext = createContext();

const ApplicationContextProvider = ({ children }) => {
  const [servicesData, setServicesData] = useState([]);

  /**
   * Connect to database provided by user at 'index'
   */
  const connectToDB = index => {
    if (index) ipcRenderer.send('connect', index);
  };
  /**
   * Fetch all microservices of a certain applications
   */
  const fetchServicesNames = application => {
    // Send Async Request
    ipcRenderer.send('servicesRequest', application);

    // Response
    ipcRenderer.on('servicesResponse', (event, data) => {
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
