import React, { useCallback, useState } from 'react';
const { ipcRenderer } = window.require('electron');

export const HealthContext = React.createContext<any>(null);

/**
 * MANAGES THE FOLLOWING DATA AND ACTIONS:
 * @property  {Object} healthData At most, 50 points of health data
 * @method    fetchHealthData
 * @method    parseHealthData
 * @method    setHealthData
 */
const HealthContextProvider: React.FC = React.memo(({ children }) => {
  const [healthData, setHealthData] = useState({});

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
      console.log(e);
    }
    return false;
  }
  // Fetches all data related to a particular app
  const fetchHealthData = useCallback((service: string) => {
    // ipcRenderer.removeAllListeners('healthResponse');
    ipcRenderer.send('healthRequest', service);
    ipcRenderer.on('healthResponse', (event: Electron.Event, data: any) => {
      let result: any;
      // Parse result
      if (tryParseJSON(data)) result = JSON.parse(data); // doesn't need to be parsed?
      // if (result) console.log('HealthContext.tsx: JSON.parse(data): ', result);
      // if (result !== undefined) {
      //   if (result.length !== undefined) console.log('Number of data points (health):', result.length);
      // }
      console.log(result);
      // Update context local state
      if (result && result.length) setHealthData(parseHealthData(result));
    });
  }, []);

  // Helper function to fetched data into individual arrays
  const parseHealthData = useCallback((data: any) => {
    const output: any = {};

    for (let entry of data) {
      for (const key in entry) {
        if (!(key in output)) output[key] = [];
        output[key].push(entry[key]);
      }
    }

    return output;
  }, []);

  return (
    <HealthContext.Provider value={{ healthData, setHealthData, fetchHealthData, parseHealthData }}>
      {children}
    </HealthContext.Provider>
  );
});

export default HealthContextProvider;
