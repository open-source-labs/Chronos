import React, { useState } from 'react';
const { ipcRenderer } = window.require('electron');

interface Data {
  activememory: number;
  blockedprocesses: number;
  cpuloadpercent: number;
  cpuspeed: number;
  cputemp: number;
  freememory: number;
  id: number;
  latency: number;
  runningprocesses: number;
  sleepingprocesses: number;
  time: string;
  totalmemory: number;
  usememory: number;
}

interface AllData {
  activememory: number[];
  blockedprocesses: number[];
  cpuloadpercent: number[];
  cpuspeed: number[];
  cputemp: number[];
  freememory: number[];
  id: number[];
  latency: number[];
  runningprocesses: number[];
  sleepingprocesses: number[];
  time: string[];
  totalmemory: number[];
  usememory: number[];
}

export const HealthContext = React.createContext<any>(null);

const HealthContextProvider: React.FC = ({ children }) => {
  const [healthData, setHealthData] = useState({});

  // Fetches all data related to a particular app
  const fetchHealthData = (service: string) => {
    ipcRenderer.send('healthRequest', service);
    ipcRenderer.on('healthResponse', (event: Electron.Event, data: any) => {
      // Parse result
      const result = JSON.parse(data);
      console.log('Number of data points (health):', result.length);
      // Update context local state
      setHealthData(parseHealthData(result));
    });
  };

  // Helper function to parse data into individual arrays
  const parseHealthData = (data: any) => {
    const output: any = {};

    for (let entry of data) {
      for (const key in entry) {
        if (!(key in output)) output[key] = [];
        output[key].push(entry[key]);
      }
    }

    return output;
  };

  return (
    <HealthContext.Provider value={{ healthData, setHealthData, fetchHealthData, parseHealthData }}>
      {children}
    </HealthContext.Provider>
  );
};

export default HealthContextProvider;
