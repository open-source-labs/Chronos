import React, { useState } from 'react';

const { ipcRenderer } = window.require('electron');

export const CommsContext = React.createContext();

const CommsContextProvider = ({ children }) => {
  const [commsData, setCommsData] = useState([]);

  const fetchCommsData = index => {
    ipcRenderer.send('overviewRequest', index);
    ipcRenderer.on('overviewResponse', (event, data) => {
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
