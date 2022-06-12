import React, { useState, useCallback } from 'react';
import Electron from 'electron';
import { transform } from 'd3';

const { ipcRenderer } = window.require('electron');

export const EventContext = React.createContext<any>(null);

/**
 * MANAGES THE FOLLOWING DATA AND ACTIONS:
 * @property  {Array} eventDataList
 * @property  {Array} eventTimeList
 * @method    fetchEventData
 * @method    setEventDataList
 * @method    setEventTimeList
 */

const EventContextProvider: React.FC = React.memo(({ children }) => {
  const [eventDataList, setEventDataList] = useState<any[]>([]);
  const [eventTimeList, setEventTimeList] = useState<any[]>([]);

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
      // console.log("result in EventContext", JSON.stringify(result));
      setEventDataList(transformData(result)[0]);
      setEventTimeList(transformData(result)[1]);
    });


    // let result = [
    //   { metric: 'metricname1', category: 'Event', time: 1, value: 10 },
    //   { metric: 'metricname1', category: 'Event', time: 2, value: 9 },
    //   { metric: 'metricname2', category: 'Event', time: 1, value: 20 },
    //   { metric: 'metricname2', category: 'Event', time: 2, value: 18 },
    //   { metric: 'metricname3', category: 'Event', time: 1, value: 8 },
    //   { metric: 'metricname3', category: 'Event', time: 2, value: 7 },
    // ];
    // setEventDataList(transformData(result)[0] || []);
    // setEventTimeList(transformData(result)[1] || []);
    
  }, []);


  const transformData = (data: any[]) => {
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
    return [dataList, timeList];
  };

  return (
    // uncoment here after pass test
    <EventContext.Provider
      value={{ eventDataList, eventTimeList, setEventDataList, setEventTimeList, fetchEventData }}
    >
      {children}
    </EventContext.Provider>
  );
});

export default EventContextProvider;
