import React, { useState, useCallback } from 'react';
import Electron from 'electron';

const { ipcRenderer } = window.require('electron');

export const EventContext = React.createContext<any>(null);

/**
 * MANAGES THE FOLLOWING DATA AND ACTIONS:
 * @property  {Object} eventData 
 * @method    fetchEventData
 * @method    setEventData
 */

const EventContextProvider: React.FC = React.memo(({ children }) => {
  const [eventData, setEventData] = useState({}); //eventData: [{time: xx, m1: xx, m2: xx}, {}, {}..]

  function tryParseJSON(jsonString: any) {
    try {
      const o = JSON.parse(jsonString);
      if (o && typeof o === 'object') {
        return true;
      }
    } catch (e) {
      console.log({ error: e });
    }
    return false;
  }

  const fetchEventData = useCallback(() => {
    ipcRenderer.removeAllListeners('kafkaResponse');
    ipcRenderer.send('kafkaRequest');
    ipcRenderer.on('kafkaResponse',  (event: Electron.Event, data: any) => {
      let result: any;
      if (tryParseJSON(data)) result = JSON.parse(data);
      // console.log("eventData in eventcontext");
      // console.log(JSON.stringify(result));
      setEventData(result || {});
    });
  }, []);


  return (
   // uncoment here after pass test 
   <EventContext.Provider value={{ eventData, setEventData, fetchEventData }}>
      {children}
    </EventContext.Provider>
  );
});

export default EventContextProvider;
