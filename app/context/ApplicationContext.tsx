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
  // v10 note: there is not function for setApp so app is never updated.
  const [app, setApp] = useState<string>('');
  const [savedMetrics, setSavedMetrics] = useState({});
  const [appIndex, setAppIndex] = useState<number>(0);
  const [intervalID, setIntervalID] = useState<NodeJS.Timeout | null>(null);
  
  /**
 * @function tryParseJson - a function that will parse the JSON data into an object. If there is any error during parsing (a.k.a there is a circular inside the JSON data), console log the error
 * @param jsonString - JSON data that is received from backend
 * @return an object with all information from backend
 */
  function tryParseJSON(jsonString: string) {
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

  /**
   * @function fetchServicesNames - a function that will take an application name and update the state of `serviceData` based on backend response
   * 1. Take in an application name
   * 
   * 2. Send a `servicesRequest` to backend
   * 
   * 3. Upon `servicesResponse`, parse the received JSON data and assign it to `servicesData`
   * 
   * 4. Remove the listener for `servicesResponse`
   * @param application - application name
   */  
  // v10: Invoked by connectToDB, passing in app (card title)
  const fetchServicesNames = useCallback((application: string) => {
    console.log('Hi, inside ApplicationConext - fetchServicesNames callback. Sending servicesRequest to ipcMain.');
    console.log('app when fetch services name: ', application);
    // setApp(application);

    ipcRenderer.send('servicesRequest');

    ipcRenderer.on('servicesResponse', (event: Electron.Event, data: any) => {
      let result: any;
      // Parse JSON data into object
      // if (tryParseJSON(data)) result = JSON.parse(data);
      result = JSON.parse(data);
      console.log('result from ipcrenderer services response is: ', result);
      console.log('Calling setServicesData passing in above result. Current servicesData is the following: ', servicesData);
      setServicesData(result);
      console.log('Leaving fetchedServicesNames function.');
      ipcRenderer.removeAllListeners('servicesResponse');
    });
  }, []);

    /**
   * @function connectToTB - invoked in Services Modal when Service Modal component is first rendered or when useEffect invoked.
   *  creates an event emitter that connects to the user provided URI for the service (should be the database URI...)
   * v10 notes: seems to only be set up for local instances, not when a cloud based service is clicked, causes an issue since a user provided 
   * database should not exist...
   * @params application - is the name of the card taht was clicked on
   */
  const connectToDB = useCallback((username: string, index: number, application: string, URI: string, databaseType: string) => {
    console.log('Hi, inside ApplicationContext, connectToDB function was invoked.');
    ipcRenderer.removeAllListeners('databaseConnected');
    ipcRenderer.send('connect', username, index, URI, databaseType);
    ipcRenderer.on('databaseConnected', (event: Electron.Event, data: any) => {
      fetchServicesNames(application);
    });
  }, []);

  /**
   * @function getSavedMetrics - a function that will wait for backend `savedMetricsResponse` to update metrics using `setSavedMetrics`
   * Trying to find what the data type needs to be. 
   */
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
