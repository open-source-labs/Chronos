import React, { useCallback, useState } from 'react';
import Electron from 'electron';
import { transformData } from './helpers';
import DeviceSignalCellularConnectedNoInternet2Bar from 'material-ui/svg-icons/device/signal-cellular-connected-no-internet-2-bar';

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
  const [healthData, setHealthData] = useState<any>({"healthDataList":[], "healthTimeList":[]});
  const [services, setServices] = useState<Array<string>>([]);
  // const [datalist, setDataList] = useState<Array<any>>([]);
  // const [timelist, setTimeList] = useState<Array<any>>([]);

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
    //setServices(serv);
    ipcRenderer.removeAllListeners('healthResponse');
    
    let temp: any[] = [];

    Promise.all(
      serv.map((service: string) =>
        new Promise((resolve, reject) => {
          console.log('serv in healthcontext:', JSON.stringify(serv));
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
          if (checkServicesComplete(temp, serv)) {
         
          // if (temp.length === serv.length) {
            
            setServices(serv);
            let transformedData : any = {};
            transformedData = transformData(temp);
            console.log("temp", temp);
            console.log("serv", serv);
            console.log('transformedData:', JSON.stringify(transformedData));
            setHealthData(transformedData);
            // setTimeList(transformedData[1]);
            // setDataList(transformedData[0]);

            

          }
        })
      )
    );
  }, []);

  const checkServicesComplete = (temp : any[], serv : string[]) =>{
    if(temp.length !== serv.length) {
      return false;
    }
    const arr1 : string[] = []
  
    for(let i = 0; i < temp.length; i++){
      arr1.push(Object.keys(temp[i])[0]);
     
    }
    console.log("arr1",arr1.sort().toString());
    console.log("serv:", serv);
    return arr1.sort().toString() === serv.sort().toString()
    
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
