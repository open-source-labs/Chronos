import React, { useState } from 'react';
import Electron from 'electron';

const { ipcRenderer } = window.require('electron');

interface IProp {
  id: number;
  microservice: string;
  endpoint: string;
  request: string;
  responsestatus: string;
  responsemessage: string;
  time: string;
  correlatingid: string;
}

interface ICommsContext {
  commsData: [IProp];
}

export const CommsContext = React.createContext<any>(null);

const CommsContextProvider: React.FC = ({ children }) => {
  const [commsData, setCommsData] = useState([]);
  const [currentApp, setCurrentApp] = useState('');

  // Fetches all data related to communication for a particular app
  const fetchCommsData = (app: string, live: boolean) => {
    /**
     * Caches results of requesting communication data for a specific app
     * Communication data will be the same across the microservices. Prevents
     * fetch requests that result in repeating data 
     */
    if (app !== currentApp || live) {
      setCurrentApp(app)
      ipcRenderer.send('commsRequest', app);
      ipcRenderer.on('commsResponse', (event: Electron.Event, data: any) => {
        // Store resulting data in local state
        const result = JSON.parse(data);
        console.log('Number of data points (comms):', result.length);
        setCommsData(result);
      });
    }
  };

  return (
    <CommsContext.Provider value={{ commsData, setCommsData, fetchCommsData }}>
      {children}
    </CommsContext.Provider>
  );
};

export default CommsContextProvider;
