import React, { useState, useCallback } from 'react';
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
  
  function tryParseJSON(jsonString: any) {
    try {
      const o = JSON.parse(jsonString);
      // Handle non-exception-throwing cases:
      // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
      // JSON.parse(null) returns null, and typeof null === "object", 
      // so we must check for that, too. Thankfully, null is falsey, so this suffices:
      if (o && typeof o === "object") {
        return o;
      }
    }
    catch (e) {
      console.log({ error: e })
    };
    return false;
  };
  /**
   * Connect to database provided by user at 'index'
   */
  const connectToDB = useCallback((index: number, application: string) => {
    ipcRenderer.removeAllListeners('databaseConnected');
    ipcRenderer.send('connect', index);
    console.log(`${__dirname}/ApplicationContext.tsx/connectToDB: ** between connect & servicesRequest`);
    
    // Response
    ipcRenderer.on('databaseConnected', (event: Electron.Event, data: any) => {
      // Parse JSON response
      const result = data;
      if (result.length)
        console.log(`${__dirname}/ApplicationContext.tsx/connectToDB: ${result}`);

      fetchServicesNames(application);
    });
  }, []);

  /**
   * Fetch all microservices of a certain applications
   */
  const fetchServicesNames = useCallback((application: string) => {
    setApp(application);
    // Send Async Request
    ipcRenderer.send('servicesRequest');

    // Response
    ipcRenderer.on('servicesResponse', (event: Electron.Event, data: any) => {
      let result: any;
      // Parse JSON response
      if (tryParseJSON(data)) result = JSON.parse(data);
      if (result.length) console.log('Number of data points (service):', result.length);

      // Set local state
      setServicesData(result);
      ipcRenderer.removeAllListeners('servicesResponse');
    });
  }, []);

  return (
    <ApplicationContext.Provider
      value={{ connectToDB, fetchServicesNames, setServicesData, servicesData, app }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export default ApplicationContextProvider;
