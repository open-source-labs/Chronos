import React, { useState, createContext } from 'react';

const { ipcRenderer } = window.require('electron');

export const ApplicationContext = createContext();

const ApplicationContextProvider = ({ children }) => {
  const connectToDB = index => {
    if (!index) {
      //do nothing
    } else {
      ipcRenderer.send('connect', index);
    }
  };
  // Greg: Created route to grab name of all services associated with an app!
  const [servicesData, setServicesData] = useState([]);

  const fetchServicesNames = application => {
    ipcRenderer.send('servicesRequest', application);
    ipcRenderer.on('servicesResponse', (event, data) => {
      // Store resulting data in local state
      // result: [{}] with cpuspeed, cputemp, etc.
      const result = JSON.parse(data);
      console.log('Number of data points (service):', result.length);
      setServicesData(result);
      // setHealthData(Object.values(JSON.parse(data)));
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
