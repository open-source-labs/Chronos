import React, { useState, useCallback } from 'react';
import Electron from 'electron';

const { ipcRenderer } = window.require('electron');

export const CommsContext = React.createContext<any>(null);

/**
 * MANAGES THE FOLLOWING DATA AND ACTIONS:
 * @property  {Array} commsData Communications data of current application
 * @method    setCommsData
 * @method    fetchCommsData
 */
const CommsContextProvider: React.SFC = React.memo(({ children }) => {
  const [commsData, setCommsData] = useState([]);
  const [currentApp, setCurrentApp] = useState('');

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

  // Fetches all data related to communication for a particular app
  const fetchCommsData = useCallback((app: string, live: boolean) => {
    /**
     * Caches results of requesting communication data for a specific app
     * Communication data will be the same across the microservices. Prevents
     * fetch requests that result in repeating data
     */
    if (app !== currentApp || live) {
      ipcRenderer.removeAllListeners('commsResponse');
      setCurrentApp(app);
      ipcRenderer.send('commsRequest', app);
      ipcRenderer.on('commsResponse', (event: Electron.Event, data: any) => {
        let result: any;
        // Store resulting data in local state
        if (tryParseJSON(data)) result = JSON.parse(data);
        // if (result.length) console.log('Number of data points (comms):', result.length);
        setCommsData(result);
      });
    }
  }, []);

  return (
    <CommsContext.Provider value={{ commsData, setCommsData, fetchCommsData }}>
      {children}
    </CommsContext.Provider>
  );
});

export default CommsContextProvider;
