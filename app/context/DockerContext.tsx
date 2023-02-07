import React, { useState, useCallback } from 'react';

const { ipcRenderer } = window.require('electron');

export const DockerContext = React.createContext<any>(null);

/**
 * MANAGES THE FOLLOWING DATA AND ACTIONS:
 * @property  {Object} dockerData Single data point consisting of docker data
 * @method    fetchDockerData
 * @method    setDockerData
 */

interface Props {
  children: any
}

const DockerContextProvider: React.FC<Props> = React.memo((props) => {
  const children = props.children;
  const [dockerData, setDockerData] = useState({});

  function tryParseJSON(jsonString: any) {
    try {
      const o = JSON.parse(jsonString);
      if (o && typeof o === 'object') {
        return o;
      }
    } catch (e) {
      console.log({ error: e });
    }
    return false;
  }

  const fetchDockerData = useCallback((service: string) => {
    ipcRenderer.removeAllListeners('dockerResponse');
    ipcRenderer.send('dockerRequest', service);

    ipcRenderer.on('dockerResponse', (data: any) => {
      let result;
      if (tryParseJSON(data)) result = JSON.parse(data);
      const newDockerData = result[0] || {};
      console.log(newDockerData);
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
