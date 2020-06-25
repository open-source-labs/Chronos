import React, { useState } from 'react';

const { ipcRenderer } = window.require('electron');

export const CommsContext = React.createContext();

const CommsContextProvider = ({ children }) => {
  const [commsData, setCommsData] = useState([]);

  // Fetches all data related to communication for a particular app
  const fetchCommsData = index => {
    ipcRenderer.send('commsRequest', index);
    ipcRenderer.on('commsResponse', (event, data) => {
      // Store resulting data in local state
      const result = JSON.parse(data);
      console.log('Number of data points (comms):', result.length);
      setCommsData(result);
    });
  };

  return (
    <CommsContext.Provider value={{ commsData, setCommsData, fetchCommsData }}>
      {children}
    </CommsContext.Provider>
  );
};

export default CommsContextProvider;
