import React, { useCallback, useState } from 'react';
import Electron from 'electron';
import { transformData } from './helpers';

const { ipcRenderer } = window.require('electron');

export const HealthContext = React.createContext<any>(null);

/**
 * MANAGES THE FOLLOWING DATA AND ACTIONS:
 * @property  {Object} healthData
 * @method    setServices
 * @method    setHealthData
 * @method    fetchHealthData
 */

const HealthContextProvider: React.FC = React.memo(({ children }) => {
  const [healthData, setHealthData] = useState<Object>({ healthDataList: [], healthTimeList: [] });
  const [services, setServices] = useState<Array<string>>([]);

  function tryParseJSON(jsonString: string) {
    try {
      const o = JSON.parse(jsonString);
      if (o && typeof o === 'object') {
        return o;
      }
    } catch (err) {
      const errorString = `Not valid JSON: ${err}`;
      console.log(errorString);
      new Error(errorString);
    }
    return false;
  }

  const checkServicesComplete = (temp: any[], serv: string[]) => {
    if (temp.length !== serv.length) {
      return false;
    }
    const arr1: string[] = [];
    for (let i = 0; i < temp.length; i++) {
      arr1.push(Object.keys(temp[i])[0]);
    }
    return arr1.sort().toString() === serv.sort().toString();
  };

  const fetchHealthData = useCallback((serv: string[]) => {
    ipcRenderer.removeAllListeners('healthResponse');

    const temp: any[] = [];

    Promise.all(
      serv.map((service: string) =>
        new Promise<Object>((resolve, reject) => {
          ipcRenderer.send('healthRequest', service);
          ipcRenderer.on('healthResponse', (event: Electron.Event, data: string) => {
            let result: any[];
            if (JSON.stringify(data) !== '{}' && tryParseJSON(data)) {
              result = JSON.parse(data);
              if (result && result.length && service === Object.keys(result[0])[0]) {
                resolve(result[0]);
              }
            }
          });
        }).then((dt: {}) => {
          temp.push(dt);
          if (checkServicesComplete(temp, serv)) {
            setServices(serv);
            let transformedData: {} = {};
            transformedData = transformData(temp);
            setHealthData(transformedData);
          }
        })
      )
    );
  }, []);

  return (
    <HealthContext.Provider
      value={{
        setHealthData,
        fetchHealthData,
        healthData,
        services,
      }}
    >
      {children}
    </HealthContext.Provider>
  );
});

export default HealthContextProvider;
