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
      setCommsData(JSON.parse(data));
    });
  };

  return (
    <CommsContext.Provider value={{ commsData, setCommsData, fetchCommsData }}>
      {children}
    </CommsContext.Provider>
  );
};

export default CommsContextProvider;
