import React, { useState } from 'react';

const { ipcRenderer } = window.require('electron');

export const HealthContext = React.createContext();

const HealthContextProvider = ({ children }) => {
  const [healthData, setHealthData] = useState([]);

  // Fetches all data related to a particular app
  const fetchHealthData = service => {
    ipcRenderer.send('healthRequest', service);
    ipcRenderer.on('healthResponse', (event, data) => {
      // Store resulting data in local state
      // result: [{}] with cpuspeed, cputemp, etc.
      const result = JSON.parse(data);
      console.log('Number of data points (service):', result.length);
      setHealthData(result);
      // setHealthData(Object.values(JSON.parse(data)));
    });
  };

  return (
    <HealthContext.Provider value={{ healthData, setHealthData, fetchHealthData }}>
      {children}
    </HealthContext.Provider>
  );
};

export default HealthContextProvider;
