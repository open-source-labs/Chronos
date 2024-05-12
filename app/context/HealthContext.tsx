import React, { useCallback, useState } from 'react';
import Electron from 'electron';
import { healthTransformer } from './helpers';
const { ipcRenderer } = window.require('electron');

export const HealthContext = React.createContext<any>(null);

/**
 * MANAGES THE FOLLOWING DATA AND ACTIONS:
 * @property  {Object} healthData
 * @method    setServices
 * @method    setHealthData
 * @method    fetchHealthData
 */

interface Props {
  children: any;
}

interface MetricObject {
  category: string;
  metric: string;
  rowNumber: number;
  time: string;
  value: number;
  __v: number;
  _id: string;
  token: string;
}
interface HealthDataObject {
  [key: string]: MetricObject[];
}

const HealthContextProvider: React.FC<Props> = React.memo(({ children }) => {
  const [healthData, setHealthData] = useState<any>({ healthDataList: [], healthTimeList: [] });
  const [services, setServices] = useState<Array<string>>([]);
  console.log({services})

  function tryParseJSON(jsonString: any) {
    try {
      const o = JSON.parse(jsonString);
      if (o && typeof o === 'object') {
        return o;
      }
    } catch (e) {
      let errorString = 'Not valid JSON: ' + e.message;
      // console.log(errorString);
      new Error(errorString);
    }
    return false;
  }

  /**
   * @function fetchEventData - sending a request to the backend to retrieve data.
   * Data is then parsed and setHealthData is called with the transformed information.
   */

  const fetchHealthData = useCallback(async servers => {
    // ipcRenderer.removeAllListeners('healthResponse');

    let temp: HealthDataObject[] = [];
    await Promise.all(servers.map( async (service: string) => {
      ipcRenderer.removeAllListeners('healthResponse');
      
      try {
        const newPromise: any = await new Promise((resolve, reject) => {
          ipcRenderer.send('healthRequest', `${service}`);
          ipcRenderer.on('healthResponse', (event: Electron.Event, data: string) => {
            //V14: the line does not appear necessary, leaving it here commented out in case another group runs into a problem
            // if (JSON.stringify(data) !== '{}' && tryParseJSON(data)) {
              const response = JSON.parse(data);
              // console.log({response})
              const [ dbName ] = Object.keys(response[0])
              //result exists, has a length prop, and the service name and database name are same
              console.log({service,dbName})
              //V14: this block is needed here because of unecessary calls for each service
              //a prior group was getting the dbName from the response object and since objects dont remember
              //insertion order they are running all the calls for each service in the array
              if (response && response.length && `${service}` === dbName) {
                resolve(response[0]);
              }
            // }
          });
        })
        temp.push(newPromise);
        if (checkServicesComplete(temp, [`${service}`])) {
          console.log({temp})

          setServices([`${service}`]);
          let transformedData: any = {};
          transformedData = healthTransformer(temp); //must match the setHealthData STATE format
          setHealthData(transformedData);
        }
        } catch (err) {
        console.log("healthcontext.tsx ERROR: ", err);
      };
    }
   
    ))
    } , []);

  const checkServicesComplete = (temp: any[], servers: string[]) => {
    if (temp.length !== servers.length) {
      return false;
    }
    const arr1: string[] = [];
    for (let i = 0; i < temp.length; i++) {
      const [ serviceName ] = Object.keys(temp[i])
      arr1.push(serviceName);
    }
    return arr1.sort().toString() === servers.sort().toString();
  };

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
