import React, { useState, useCallback } from 'react';

const { ipcRenderer } = window.require('electron');

export const EventContext = React.createContext<any>(null);

/**
 * MANAGES THE FOLLOWING DATA AND ACTIONS:
 * @property  {Object} eventData 
 * @method    fetchEventData
 * @method    setEventData
 */

const EventContextProvider: React.FC = React.memo(({ children }) => {
  const [eventData, setEventData] = useState({});

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

  const fetchEventData = useCallback(() => {
    ipcRenderer.removeAllListeners('eventResponse');
    ipcRenderer.send('eventRequest');

    ipcRenderer.on('eventResponse', (data: any) => {
      let result: any;
      if (tryParseJSON(data)) result = JSON.parse(data); 
      //data :[{  ActiveControllerCount: 10,
      //     OfflinePartitionsCount: 5,
      //     UncleanLeaderElectionsPerSec: 2,
      //     DiskUsage: 60,}]
      const newEventData = result[0] || {};
      setEventData(newEventData);
    });
  }, []);
  // const fetchEventData = useCallback((broker: string) => {
  //   setEventData({  ActiveControllerCount: 10,
  //     OfflinePartitionsCount: 5,
  //     UncleanLeaderElectionsPerSec: 2,
  //     DiskUsage: 60,})
  // }, []);

  return (
   // uncoment here after pass test 
   <EventContext.Provider value={{ eventData, setEventData, fetchEventData }}>
      {children}
    </EventContext.Provider>
  );
});

export default EventContextProvider;
