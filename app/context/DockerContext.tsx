import React, { useState } from 'react';
const { ipcRenderer } = window.require('electron');

export const DockerContext = React.createContext<any>(null);

const DockerContextProvider: React.FC = ({ children }) => {
  const [dockerData, setDockerData] = useState({});
  // interface IContainer {
  //   (containername: string): string;
  //   (containerid: string): string;
  //   (platform: string): string;
  //   (starttime: string): string;
  //   (memoryusage: string): number;
  //   (memorylimit: string): number;
  //   (memorypercent: string): number;
  //   (cpupercent: string): number;
  //   (networkreceived: string): number;
  //   (networksent: string): number;
  //   (processcount: string): number;
  //   (restartcount: string): number;
  // }

  interface IContainer {
    [key: string]: string | number | never;
  }

  // Fetches all data related to a particular app
  const fetchDockerData = (service: string) => {
    ipcRenderer.send('dockerRequest', service);

    ipcRenderer.on('dockerResponse', (event: Electron.Event, data: any) => {
      // Parse result
      const result: IContainer[] = JSON.parse(data);
      console.log('Number of data points (docker):', result.length);

      // Display single data point
      const newDockerData = result[0] || {};
      setDockerData(newDockerData);
    });
  };
  return (
    <DockerContext.Provider value={{ dockerData, setDockerData, fetchDockerData }}>
      {children}
    </DockerContext.Provider>
  );
};

export default DockerContextProvider;
