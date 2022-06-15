import React, { useCallback, useState } from 'react';
import Electron from 'electron';
import { transformData } from './helpers';
import DeviceSignalCellularConnectedNoInternet2Bar from 'material-ui/svg-icons/device/signal-cellular-connected-no-internet-2-bar';

const { ipcRenderer } = window.require('electron');

export const HealthContext = React.createContext<any>(null);

/**
 * MANAGES THE FOLLOWING DATA AND ACTIONS:
 * @property  {Object} healthData
 * @method    setServices
 * @method    setHealthData

 */

const HealthContextProvider: React.FC = React.memo(({ children }) => {
  const [healthData, setHealthData] = useState<any>({"healthDataList":[], "healthTimeList":[]});
  const [services, setServices] = useState<Array<string>>([]);

  function tryParseJSON(jsonString: any) {
    try {
      console.log("jsonString in HealthContext:", jsonString);
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
    
    let temp: any[] = [];

    Promise.all(
      serv.map((service: string) =>{
        // if(service !== 'kafkametrics'){
          
        return new Promise((resolve, reject) => {
       //   console.log('serv in healthcontext:', JSON.stringify(serv));
          ipcRenderer.send('healthRequest', service);
          ipcRenderer.on('healthResponse', (event: Electron.Event, data: string) => {

            let result: any[];
            if (tryParseJSON(data)) {
        //      console.log("data in HealthContext:", data);
              result = JSON.parse(data);
              if (result && result.length && service === Object.keys(result[0])[0]) {
       //         console.log("in the resolve!!");
                resolve(result[0]);
              }
            }
          
          });
          
        }).then((dt: any) => {
        
            temp.push(dt);
          //  console.log("temp is:", JSON.stringify(temp));
          
          if (checkServicesComplete(temp, serv)) {
            
            setServices(serv);
            let transformedData : any = {};
            transformedData = transformData(temp);
          //  console.log("temp", temp);
          //  console.log("serv", serv);
          //  console.log('transformedData:', JSON.stringify(transformedData));
            setHealthData(transformedData);

          }
        })
      }
      // }     
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
