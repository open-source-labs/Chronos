import React, { useCallback, useState } from 'react';
import Electron from 'electron';

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
  const [healthData, setHealthData] = useState<Array<Array<{ [key: string]: string | number }>>>(
    []
  );

  const [services, setServices] = useState<Array<string>>([]);

  function tryParseJSON(jsonString: any) {
    try {
      const o = JSON.parse(jsonString);
      if (o && typeof o === 'object') {
        return o;
      }
    } catch (e) {
      console.log(e);
    }
    return false;
  }

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

  const fetchHealthData = useCallback(serv => {
    setServices(serv);

    const temp: Array<Array<any>> = [];

    Promise.all(
      serv.map((service: string) =>
        new Promise((resolve, reject) => {
          ipcRenderer.send('healthRequest', service);
          ipcRenderer.on('healthResponse', (event: Electron.Event, data: string) => {
            let result: { [key: string]: string | number }[];

            if (tryParseJSON(data)) {
              result = JSON.parse(data);
              if (result && result.length && service === result[0].service) {
                resolve({ ...parseHealthData(result) });
              }
            }
          });
        }).then((data: any) => {
          temp.push(data);
          if (temp.length === serv.length) {
            setHealthData(temp);
          }
        })
      )
    );
  }, []);

  return (
    <HealthContext.Provider
      value={{
        healthData,
        setHealthData,
        fetchHealthData,
        parseHealthData,
        services,
      }}
    >
      {children}
    </HealthContext.Provider>
  );
});

export default HealthContextProvider;
