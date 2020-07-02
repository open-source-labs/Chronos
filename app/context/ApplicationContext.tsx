import React, { useState, createContext, Props } from 'react';
import Electron from 'electron';

const { ipcRenderer } = window.require('electron');

// interface IApplicationContext {
//   connectToDB?: (index: number) => void;
//   fetchServicesNames?: (application: string) => void;
//   setServicesData?: React.Dispatch<React.SetStateAction<never[]>>;
//   servicesData?: number[];
// }

export const ApplicationContext = React.createContext<any>(null);

const ApplicationContextProvider: React.FC = ({ children }) => {
  const [servicesData, setServicesData] = useState([]);
  /**
   * Connect to database provided by user at 'index'
   */
  const connectToDB = async (index: number) => {
    console.log('Connecting to DB at index =>', index)
    await ipcRenderer.send('connect', index);
  };
  /**
   * Fetch all microservices of a certain applications
   */
  const fetchServicesNames = (application: string) => {
    console.log('Fetching service names')
    // Send Async Request
    ipcRenderer.send('servicesRequest');

    // Response
    ipcRenderer.on('servicesResponse', (event: Electron.Event, data: any) => {
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
