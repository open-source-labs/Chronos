import React, { useState } from 'react';

const { ipcRenderer } = window.require('electron');

export const HealthContext = React.createContext();

const HealthContextProvider = ({ children }) => {
  const [healthData, setHealthData] = useState([]);

  // Fetches all of the microservice health data for a specificied app
  const fetchHealthData = index => {
    ipcRenderer.send('detailsRequest', index);
    ipcRenderer.on('detailsResponse', (event, data) => {
      // Store fetched data in local state
      setHealthData(Object.values(JSON.parse(data)));
    });
  };

  return (
    <HealthContext.Provider value={{ setHealthData, healthData, fetchHealthData }}>
      {children}
    </HealthContext.Provider>
  );
};

export default HealthContextProvider;
