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

          
        return new Promise((resolve, reject) => {
 
          ipcRenderer.send('healthRequest', service);
          ipcRenderer.on('healthResponse', (event: Electron.Event, data: string) => {
            console.log("data in healthcontext:", JSON.stringify(data));
            let result: any[];
            if (JSON.stringify(data) !== '{}' && tryParseJSON(data)) {
              result = JSON.parse(data);
              if (result && result.length && service === Object.keys(result[0])[0]) {

                resolve(result[0]);
              }
            }
           
          
          });
          
        }).then((dt: any) => {
        
            temp.push(dt);
          
          if (checkServicesComplete(temp, serv)) {
            
            setServices(serv);
            let transformedData : any = {};
            transformedData = transformData(temp);
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
