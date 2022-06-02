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
    ipcRenderer.removeAllListeners('kafkaResponse');
    ipcRenderer.send('kafkaRequest');
    console.log("outside of the kafka repsone");
    ipcRenderer.on('kafkaResponse',  (event, data) => {
      let result: any;
      console.log("before parse");
      console.log(data);
      if (tryParseJSON(data)) result = JSON.parse(data);

      console.log("after parse");
      console.log(result);

      const newEventData = result[0] || {};
    
      setEventData(newEventData);
    });
  }, []);
  // const fetchEventData = useCallback(() => {
  //   setEventData({  ActiveControllerCount: 10,
  //     OfflinePartitionsCount: 5,
  //     UncleanLeaderElectionsPerSec: 2})
  // }, []);

  return (
   // uncoment here after pass test 
   <EventContext.Provider value={{ eventData, setEventData, fetchEventData }}>
      {children}
    </EventContext.Provider>
  );
});

export default EventContextProvider;
