import React, { useCallback, useEffect, useState } from 'react';
import Electron from 'electron';
// import { resolve } from 'core-js/fn/promise';

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
  /// might need to be array
  const [healthData, setHealthData] = useState<Array<Array<{ [key: string]: string | number }>>>(
    []
  );

  const [services, setServices] = useState<Array<string>>([])

  // FOR CHECKING
  // useEffect(() => {
  //   console.log(healthData);
  // }, [healthData]);

  function tryParseJSON(jsonString: any) {
    
    try {
      const o = JSON.parse(jsonString);
      console.log('o', o)
      // Handle non-exception-throwing cases:
      // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
      // JSON.parse(null) returns null, and typeof null === "object",
      // so we must check for that, too. Thankfully, null is falsy, so this suffices:
      if (o && typeof o === 'object') {
        return o;
      }
    } catch (e) {
      console.log(e);
    }
    return false;
  }

  // Helper function to fetched data into individual arrays
  const parseHealthData = useCallback((data: any) => {
    const output: any = {};
    for (const entry of data) {
      for (const key in entry) {
        if (!(key in output)) output[key] = [];
        output[key].push(entry[key]);
      }
    }

    return output;
  }, []);

  // Fetches all data related to a particular app
  const fetchHealthData = useCallback((services: string[]) => {
    // ipcRenderer.removeAllListeners('healthResponse');

    // setHealthData([]);

    setServices(services)
    

    const temp: Array<Array<any>> = [];

    Promise.all(
      services.map(service =>
        new Promise((resolve, reject) => {
          ipcRenderer.send('healthRequest', service);
          ipcRenderer.on('healthResponse', (event: Electron.Event, data: string) => {
            let result: { [key: string]: string | number }[];
            // Parse result
            // console.log('event',event)
            // console.log(data);

            if (tryParseJSON(data)) {
              result = JSON.parse(data); // doesn't need to be parsed?
              // Update context local state
              if (result && result.length && service === result[0].service) {
                resolve({ ...parseHealthData(result) });
              }
            }
          });
        }).then((data: any) => {
          temp.push(data);
          if (temp.length === services.length) {
            setHealthData(temp);
          }
        })
      )
    );
  }, []);

  return (
    <HealthContext.Provider value={{ healthData, setHealthData, fetchHealthData, parseHealthData, services }}>
      {children}
    </HealthContext.Provider>
  );
});

export default HealthContextProvider;
