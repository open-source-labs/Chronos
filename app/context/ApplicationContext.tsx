import React, { useState } from 'react';
import Electron from 'electron';

const { ipcRenderer } = window.require('electron');

/**
 * MANAGES THE FOLLOWING DATA AND ACTIONS:
 * @property  {string} app Name of the current application in view
 * @property  {Array} servicesData The microservices of that application
 * @method    connectToDB
 * @method    fetchServicesNames
 */
export const ApplicationContext = React.createContext<any>(null);

const ApplicationContextProvider: React.FC = ({ children }) => {
  const [servicesData, setServicesData] = useState([]);
  const [app, setApp] = useState<string>('');
  
  /**
   * Connect to database provided by user at 'index'
   */
  const connectToDB = async (index: number, application: string) => {
    ipcRenderer.removeAllListeners('databaseConnected');
    await ipcRenderer.send('connect', index);
    console.log(`${__dirname}/ApplicationContext.tsx/connectToDB: ** between connect & servicesRequest`);
    
    // Response
    ipcRenderer.on('databaseConnected', (event: Electron.Event, data: any) => {
      // Parse JSON response
      const result = data;
      if (result.length)
        console.log(`${__dirname}/ApplicationContext.tsx/connectToDB: ${result}`);

      fetchServicesNames(application);
    });
  };

  /**
   * Fetch all microservices of a certain applications
   */
  const fetchServicesNames = (application: string) => {
    setApp(application);
    // Send Async Request
    ipcRenderer.send('servicesRequest');

    // Response
    ipcRenderer.on('servicesResponse', (event: Electron.Event, data: any) => {
      // Parse JSON response
      const result = JSON.parse(data);
      if (result.length) console.log('Number of data points (service):', result.length);

      // Set local state
      setServicesData(result);
      ipcRenderer.removeAllListeners('servicesResponse');
    });
  };

  return (
    <ApplicationContext.Provider
      value={{ connectToDB, fetchServicesNames, setServicesData, servicesData, app }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export default ApplicationContextProvider;
