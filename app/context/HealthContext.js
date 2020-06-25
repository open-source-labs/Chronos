import React, { useState } from 'react';

const { ipcRenderer } = window.require('electron');

export const HealthContext = React.createContext();

const HealthContextProvider = ({ children }) => {
  const [healthData, setHealthData] = useState({});

  // Fetches all data related to a particular app
  const fetchHealthData = service => {
    ipcRenderer.send('healthRequest', service);
    ipcRenderer.on('healthResponse', (event, data) => {
      // Parse result
      const result = JSON.parse(data);
      console.log('Number of data points (health):', result.length);

      // Separate data into individual arrays
      const freq = {};
      result.forEach(obj => {
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
