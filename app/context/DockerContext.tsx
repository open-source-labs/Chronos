import React, { useState } from 'react';

const { ipcRenderer } = window.require('electron');

export const DockerContext = React.createContext<any>(null);

const DockerContextProvider: React.FC = ({ children }) => {
  const [dockerData, setDockerData] = useState({});
  console.log('dockerdata------------>',dockerData)

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
  const fetchDockerData = (service: string) => {
    ipcRenderer.send('dockerRequest', service);
    ipcRenderer.on('dockerResponse', (event: Electron.Event, data: any) => {
      // Parse result
      const result = JSON.parse(data);
      console.log('Number of data points (docker):', result.length);

      // Separate data into individual arrays
      const freq: any = {};
      result.forEach((obj: any) => {
        for (const key in obj) {
          if (!(key in freq)) freq[key] = [];
          freq[key].push(obj[key]);
        }
      });

      // Update context local state
      setDockerData(freq);
    });
  };

  return (
    <DockerContext.Provider value={{ dockerData, setDockerData, fetchDockerData }}>
      {children}
    </DockerContext.Provider>
  );
};

export default DockerContextProvider;