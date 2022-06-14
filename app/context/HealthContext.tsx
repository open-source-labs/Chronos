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
      let errorString = "Not valid JSON: " + e.message;
    	console.log(errorString);
    	new Error(errorString);
    }
    return false;
  }

  const fetchHealthData = useCallback(serv => {
    ipcRenderer.removeAllListeners('healthResponse');
    setServices(serv);

    let temp: any[] = [];

    Promise.all(
      serv.map((service: string) =>
        new Promise((resolve, reject) => {
          
          ipcRenderer.send('healthRequest', service);
          ipcRenderer.on('healthResponse', (event: Electron.Event, data: string) => {
    
           
            //second  query customers
            // [
            //   {
            //     customers: [
            //       { metric: "disk_usage", category: "Memory", time: 1, value: 10 },
            //       { metric: "disk_usage", category: "Memory", time: 2, value: 20 },
            //       { metric: "clockSpeed", category: "Memory", time: 1, value: 8 },
            //       { metric: "clockSpeed", category: "Memory", time: 2, value: 16 },
            //       { metric: "cpu_temp", category: "CPU", time: 1, value: 100 },
            //       { metric: "cpu_temp", category: "CPU", time: 2, value: 200 },
            //     ],
            //   },
            // ]
            let result: any[];
            if (tryParseJSON(data)) {
              console.log("data in HealthContext:", data);
              result = JSON.parse(data);
              if (result && result.length && service === Object.keys(result[0])[0]) {
                console.log("in the resolve!!");
                resolve(result[0]);
              }
            }
          
          });
          
        }).then((dt: any) => {
          temp.push(dt);
          console.log("temp is:", JSON.stringify(temp));
          // temp = [
          //   {
          //     "chronos-mon": [
          //       { metric: 'disk_usage', category: 'Memory', time: 1, value: 10 },
          //       { metric: 'disk_usage', category: 'Memory', time: 2, value: 20 },
          //       { metric: 'clockSpeed', category: 'Memory', time: 1, value: 8 },
          //       { metric: 'clockSpeed', category: 'Memory', time: 2, value: 16 },
          //       { metric: 'cpu_temp', category: 'CPU', time: 1, value: 100 },
          //       { metric: 'cpu_temp', category: 'CPU', time: 2, value: 200 },
          //     ],
          //   },
          //   {
          //     "chronos-mon-2": [
          //       { metric: 'disk_usage', category: 'Memory', time: 1, value: 10000 },
          //       { metric: 'disk_usage', category: 'Memory', time: 2, value: 20000 },
          //       { metric: 'clockSpeed', category: 'Memory', time: 1, value: 8000 },
          //       { metric: 'clockSpeed', category: 'Memory', time: 2, value: 16000 },
          //       { metric: 'cpu_temp', category: 'CPU', time: 1, value: 10000 },
          //       { metric: 'cpu_temp', category: 'CPU', time: 2, value: 20000 },
          //     ],
          //   },
          // ];
          if (temp.length === serv.length) {
  
            console.log('serv:', JSON.stringify(serv));
            const transformedData = transformData(temp);
            console.log('transformedData:', JSON.stringify(transformedData));

            setDataList(transformedData[0]);
            setTimeList(transformedData[1]);

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
