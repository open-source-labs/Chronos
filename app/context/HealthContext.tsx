import React, { useCallback, useState } from 'react';
import Electron from 'electron';
import { transformData } from './helpers';

const { ipcRenderer } = window.require('electron');

export const HealthContext = React.createContext<any>(null);

/**
 * MANAGES THE FOLLOWING DATA AND ACTIONS:
 * @property  {Object} datalist At most, 50 points of health data
 * @property  {Object} timelist Health data timestamps
 * @method    setServices
 * @method    setDataList
 * @method    setTimeList
 */

const HealthContextProvider: React.FC = React.memo(({ children }) => {
  const [services, setServices] = useState<Array<string>>([]);
  const [datalist, setDataList] = useState<Array<any>>([]);
  const [timelist, setTimeList] = useState<Array<any>>([]);

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
                resolve({ ...transformData(result) });
              }
            }
          });
        }).then((data: any) => {
          temp.push(data);
          if (temp.length === serv.length) {
            setDataList(temp[0][0]);
            setTimeList(temp[0][1]);
          }
        })
      )
    );
  }, []);

  return (
    <HealthContext.Provider
      value={{
        setDataList,
        setTimeList,
        fetchHealthData,
        datalist,
        timelist,
        services,
      }}
    >
      {children}
    </HealthContext.Provider>
  );
});

export default HealthContextProvider;
