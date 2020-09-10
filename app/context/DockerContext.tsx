import React, { useState } from 'react';
const { ipcRenderer } = window.require('electron');

interface IContainer {
  [key: string]: string | number | never;
}

export const DockerContext = React.createContext<any>(null);

/**
 * MANAGES THE FOLLOWING DATA AND ACTIONS:
 * @property  {Object} dockerData Single data point consisting of docker data
 * @method    setDockerData
 * @method    fetchDockerData
 */
const DockerContextProvider: React.FC = ({ children }) => {
  const [dockerData, setDockerData] = useState({});

  // Fetches all data related to a particular app
  const fetchDockerData = (service: string) => {
    ipcRenderer.send('dockerRequest', service);

    ipcRenderer.on('dockerResponse', (event: Electron.Event, data: any) => {
      // Parse result
      const result: IContainer[] = JSON.parse(data);

      if (result.length) console.log('Number of data points (docker):', result.length);
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
