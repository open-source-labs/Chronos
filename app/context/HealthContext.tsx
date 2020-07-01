import React, { useState } from 'react';
// import { ipcRenderer } from 'electron';
const { ipcRenderer } = window.require('electron');

export const HealthContext = React.createContext<any>(null);

const HealthContextProvider: React.FC = ({ children }) => {
  const [healthData, setHealthData] = useState({});
   
  // interface IFreq {
  //   activememory?: number[];
  //   blockedprocesses?: number[];
  //   cpuloadpercent?: number[];
  //   cpuspeed?: number[];
  //   cputemp?: number[];
  //   freememory?: number[];
  //   id?: number[];
  //   latency?: number[];
  //   runningprocesses?: number[];
  //   sleepingprocesses?: number[];
  //   time?: string[];
  //   totalmemory?: number[];
  //   usememory?: number[];
  // }

  // Fetches all data related to a particular app
  const fetchHealthData = (service: string) => {
    ipcRenderer.send('healthRequest', service);
    ipcRenderer.on('healthResponse', (event: Electron.Event, data: any) => {
      // Parse result
      const result = JSON.parse(data);
      console.log('Number of data points (health):', result.length);

      // Separate data into individual arrays
      const freq: any = {};
      result.forEach((obj: any) => {
        for (const key in obj) {
          if (!(key in freq)) freq[key] = [];
          freq[key].push(obj[key]);
        }
      });

      // Update context local state
      setHealthData(freq);
    });
  };

  return (
    <HealthContext.Provider value={{ healthData, setHealthData, fetchHealthData }}>
      {children}
    </HealthContext.Provider>
  );
};

export default HealthContextProvider;
