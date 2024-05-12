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

    let temp: HealthDataObject[] = [];
    servers.map( async (service: string) => {
      
    try {

      ipcRenderer.removeAllListeners('healthResponse');
      ipcRenderer.send('healthRequest', `${service}`);
      ipcRenderer.on('healthResponse', (event: Electron.Event, data: string) => {
        
        const response = JSON.parse(data);
        temp.push(response[0]);

        if(temp.length === servers.length) {
          console.log(temp.length,servers.length)
          setServices([`${service}`]);
          let transformedData: any = {};
          transformedData = healthTransformer(temp); //must match the setHealthData STATE format
          setHealthData(transformedData);
        }
      });
    } catch (err) {
    console.log("healthcontext.tsx ERROR: ", err);
  }})} , []);

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
