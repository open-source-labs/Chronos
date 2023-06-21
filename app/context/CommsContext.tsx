/** From Version 5.2 Team:
 * We only cleaned up linting errors in this file.
 * Good luck!
 */

import React, { useState, useCallback } from 'react';
import Electron from 'electron';

const { ipcRenderer } = window.require('electron');

export const CommsContext = React.createContext<any>(null);

/**
 * MANAGES THE FOLLOWING DATA AND ACTIONS:
 * @property  {Array} commsData Communications data of current application
 * @method    setCommsData
 * @method    fetchCommsData
 */

interface Props {
  children: any;
}
const CommsContextProvider: React.FC<Props> = React.memo((props) => {
  const children = props.children;
  const [commsData, setCommsData] = useState([]);
  const [currentApp, setCurrentApp] = useState('');

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


  /**
   * @function fetchCommsData - uses useCallback Hook returns a memoized callback function.
   * One reason to use useCallback is to prevent a component from re-rendering unless its props have changed.
   * fetches the data
   */
  const fetchCommsData = useCallback((app: string, live: boolean) => {

    if (app !== currentApp || live) {
      ipcRenderer.removeAllListeners('commsResponse');
      setCurrentApp(app);
      ipcRenderer.send('commsRequest');
      ipcRenderer.on('commsResponse', (event: Electron.Event, data: any) => {
        let result: any;
        if (tryParseJSON(data)) result = JSON.parse(data);
        // console.log(data); 
        setCommsData(result);
      });
    }
  }, []);

  return (
    <CommsContext.Provider value={{ commsData, setCommsData, fetchCommsData }}>
      {children}
    </CommsContext.Provider>
  );
});

export default CommsContextProvider;
