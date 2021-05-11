//this file is to be used for login capabilities, however it is not fully implemented
import React, { useState, useCallback } from 'react';
import Electron from 'electron';

const { ipcRenderer } = window.require('electron');

export const LoginContext = React.createContext<any>(null);

const LoginContextProvider: React.FC = React.memo(({ children }) => {
  // const [loginData, setLoginData] = useState([]);
/**
// // * MANAGES THE FOLLOWING DATA AND ACTIONS:
// * @property  {Object} loginData
 *   @method    fetchLoginData
*/
function tryParseJSON(jsonString: any) {
  try {
    const o = JSON.parse(jsonString);
    // Handle non-exception-throwing cases:
    // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
    // JSON.parse(null) returns null, and typeof null === "object", 
    // so we must check for that, too. Thankfully, null is falsey, so this suffices:
    if (o && typeof o === "object") {
      return o;
    }
  }
  catch (e) {
    console.log({ error: e })
  };
  return false;
};

const connectToDB = useCallback((index: number, application: string) => {
  //takes a channel as parameter
 ipcRenderer.removeAllListeners('databaseConnected');
 //takes a channel and args(type is any) as parameters
 ipcRenderer.send('connect', index);
 // console.log(`${__dirname}/ApplicationContext.tsx/connectToDB: ** between connect & servicesRequest`);
 
 // Response from data.ts 
 //ipcRenderer.on(channel, listener) channel-str listener-func
 ipcRenderer.on('databaseConnected', (event: Electron.Event, data: any) => {
   // Parse JSON response
   const result = data;
   // if (result) console.log(`${__dirname}/ApplicationContext.tsx/connectToDB: ${result}`);
  
   //unsure how to get to match line 47
   fetchLoginData(application, result);
 });
}, []);
// Fetches all data related to communication for a particular app
const fetchLoginData = useCallback((email: string, password: string) => {
  /**
   * Caches results of requesting communication data for a specific app
   * Communication data will be the same across the microservices. Prevents
   * fetch requests that result in repeating data 
   */
  if (email && password) {
    ipcRenderer.removeAllListeners('loginResponse');
    // setCurrentApp(app)
    ipcRenderer.send('loginRequest', email);
    ipcRenderer.on('loginResponse', (event: Electron.Event, data: any) => {
      let result: any;
      // Store resulting data in local state
      if (tryParseJSON(data)) result = JSON.parse(data); 
      // if (result.length) console.log('Number of data points (comms):', result.length);
      console.log('successful login');
    });
  }
}, []);

return (
  <LoginContext.Provider
    value={{ connectToDB, fetchLoginData }}
  >
     {children}
  </LoginContext.Provider>
);
});

export default LoginContextProvider;