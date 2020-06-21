import React, { useState } from 'react';

const { ipcRenderer } = window.require('electron');

export const HealthContext = React.createContext();

const HealthContextProvider = ({ children }) => {
  const [healthData, setHealthData] = useState([]);

  // Fetches all data related to microservice health for a particular app
  const fetchHealthData = index => {
    ipcRenderer.send('detailsRequest', index);
    ipcRenderer.on('detailsResponse', (event, data) => {
      // Store resulting data in local state
      setHealthData(Object.values(JSON.parse(data)));
    });
  };

  return (
    <HealthContext.Provider value={{ healthData, setHealthData, fetchHealthData }}>
      {children}
    </HealthContext.Provider>
  );
};

export default HealthContextProvider;
