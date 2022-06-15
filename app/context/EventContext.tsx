import React, { useState, useCallback } from 'react';
import Electron from 'electron';
import { transform } from 'd3';

const { ipcRenderer } = window.require('electron');

export const EventContext = React.createContext<any>(null);

/**
 * MANAGES THE FOLLOWING DATA AND ACTIONS:
 * @property  {Object} eventData
 * @method    fetchEventData
 * @method    setEventData

 */

const EventContextProvider: React.FC = React.memo(({ children }) => {
  const [eventData, setEventData] = useState({"eventDataList":[], "eventTimeList": []});

  function tryParseJSON(jsonString: any) {
    try {
     console.log("jsonString at EventContext:", jsonString);
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
    // if(serv === 'kafkametrics'){
     // console.log("in fetchEventData in EventContext!!");
      ipcRenderer.removeAllListeners('kafkaResponse');
      ipcRenderer.send('kafkaRequest');
      ipcRenderer.on('kafkaResponse',  (event: Electron.Event, data: any) => {
        let result: any;
        if (tryParseJSON(data)) result = JSON.parse(data);
      //  console.log("eventData in eventcontext");
      //  console.log(JSON.stringify(result));
      //  console.log("result in EventContext", JSON.stringify(result));
        let transformedData : any = {};
        if(result && result.length > 0){
          transformedData = transformEventData(result[0]['kafkametrics']);
          setEventData(transformedData);
        }

      });

    // }

    
  }, []);


  const transformEventData = (data: any[]) => {
    //[{metric: xx, category: ‘event’, time:xx, value: xx},{},{}....]
    const dataList: any[] = [];
    const timeList: any[] = [];
    const metricSet = new Set();
    data.forEach(element => {
      // console.log("Element in EventContext:");
      // console.log(JSON.stringify(element));
      const metricName = element.metric;
      const time = element.time;
      const value = element.value;
      if (!metricSet.has(metricName)) {
        metricSet.add(metricName);
        const metricObj_data: any = {};
        const metricObj_time: any = {};
        metricObj_data[metricName] = [value];
        metricObj_time[metricName] = [time];
        dataList.push(metricObj_data);
        timeList.push(metricObj_time);
      } else {
        dataList.forEach(element => {
          if (Object.keys(element)[0] === metricName) {
            element[metricName].push(value);
          }
        });
        timeList.forEach(element => {
          if (Object.keys(element)[0] === metricName) {
            element[metricName].push(time);
          }
        });
      }
    });
   // console.log("datalist in EventContext:", JSON.stringify(dataList));
    return {"eventDataList": dataList, "eventTimeList": timeList};
  };

  return (
    // uncoment here after pass test
    <EventContext.Provider
      value={{ eventData, setEventData, fetchEventData }}
    >
      {children}
    </EventContext.Provider>
  );
});

export default EventContextProvider;
