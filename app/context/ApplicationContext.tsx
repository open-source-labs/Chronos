import React, { useState, useCallback } from 'react';
import Electron from 'electron';

const { ipcRenderer } = window.require('electron');

/**
 * MANAGES THE FOLLOWING DATA AND ACTIONS:
 * @property  {string} app Name of the current application in view
 * @property  {Array} servicesData The microservices of that application
 * @method    fetchServicesNames
 * @method    connectToDB
 */

interface AppContextProps {
  children: any;
}

export const ApplicationContext = React.createContext<any>(null);

const ApplicationContextProvider: React.FC<AppContextProps> = React.memo(props => {
  const children = props.children;
  const [servicesData, setServicesData] = useState([]);
  const [app, setApp] = useState<string>('');
  const [savedMetrics, setSavedMetrics] = useState({});
  const [appIndex, setAppIndex] = useState<number>(0);
  const [intervalID, setIntervalID] = useState<NodeJS.Timeout | null>(null);

  function tryParseJSON(jsonString: any) {
    try {
      const o = JSON.parse(jsonString);

      if (o && typeof o === 'object') {
        return o;
      }
    } catch (e) {
      console.log({ error: e });
    }
    return false;
  }

  const fetchServicesNames = useCallback((application: string) => {
    console.log('app when fetch services name', application);
    // setApp(application);

    ipcRenderer.send('servicesRequest');

    ipcRenderer.on('servicesResponse', (event: Electron.Event, data: any) => {
      let result: any;
      if (tryParseJSON(data)) result = JSON.parse(data);
      console.log('result from ipcrenderer services response is: ', result);
      setServicesData(result);
      ipcRenderer.removeAllListeners('servicesResponse');
    });
  }, []);

  const connectToDB = useCallback((username: string, index: number, application: string) => {
    ipcRenderer.removeAllListeners('databaseConnected');
    ipcRenderer.send('connect', username, index);

    ipcRenderer.on('databaseConnected', (event: Electron.Event, data: any) => {
      fetchServicesNames(application);
    });
  }, []);

  const getSavedMetrics = useCallback(() => {
    ipcRenderer.send('savedMetricsRequest');
    ipcRenderer.on('savedMetricsResponse', (event: Electron.Event, data: any) => {
      const store: object = {};
      data.forEach(el => {
        store[el.metric] = el;
      });
      console.log('result from getSavedMetrics is: ', store);
      setSavedMetrics(store);
    });
  }, []);

  return (
    <ApplicationContext.Provider
      value={{
        connectToDB,
        fetchServicesNames,
        setServicesData,
        servicesData,
        app,
        setApp,
        getSavedMetrics,
        setSavedMetrics,
        savedMetrics,
        appIndex, 
        setAppIndex,
        intervalID,
        setIntervalID,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
});

export default ApplicationContextProvider;
