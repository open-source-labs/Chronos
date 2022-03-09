import React, { useState, useCallback } from 'react';

const { ipcRenderer } = window.require('electron');

// interface IContainer {
//   [key: string]: string | number; // | never
// }

export const DockerContext = React.createContext<any>(null);

/**
 * MANAGES THE FOLLOWING DATA AND ACTIONS:
 * @property  {Object} dockerData Single data point consisting of docker data
 * @method    setDockerData
 * @method    fetchDockerData
 */
const DockerContextProvider: React.FC = React.memo(({ children }) => {
  const [dockerData, setDockerData] = useState({});

  function tryParseJSON(jsonString: any) {
    try {
      const o = JSON.parse(jsonString);
      // Handle non-exception-throwing cases:
      // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
      // JSON.parse(null) returns null, and typeof null === "object",
      // so we must check for that, too. Thankfully, null is falsey, so this suffices:
      if (o && typeof o === 'object') {
        return o;
      }
    } catch (e) {
      console.log({ error: e });
    }
    return false;
  }

  // Fetches all data related to a particular app
  const fetchDockerData = useCallback((service: string) => {
    ipcRenderer.removeAllListeners('dockerResponse');
    ipcRenderer.send('dockerRequest', service);

    // event: Electron.Event
    ipcRenderer.on('dockerResponse', (data: any) => {
      let result;
      // Parse result
      if (tryParseJSON(data)) result = JSON.parse(data);
      // if (result.length) console.log('Number of data points (docker):', result.length);
      // Display single data point
      const newDockerData = result[0] || {};
      setDockerData(newDockerData);
    });
  }, []);
  return (
    <DockerContext.Provider value={{ dockerData, setDockerData, fetchDockerData }}>
      {children}
    </DockerContext.Provider>
  );
});

export default DockerContextProvider;
