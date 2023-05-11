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

interface Props {
  children: any
}

const EventContextProvider: React.FC<Props> = React.memo(({ children }) => {
  const [eventData, setEventData] = useState({ eventDataList: [], eventTimeList: [] });
  // const [eventKafkaData, setEventKafkaData] = useState({ eventDataList: [], eventTimeList: [] });
  // const [eventKubernetesData, setEventKubernetesData] = useState({ eventDataList: [], eventTimeList: [] });

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

  /**
   * @function fetchEventData - takes parameter arg. 
   * Checks if arg is strictly equals to 'kafkametrics', if so removes the event listerner suing the ipcRenderer.removeAllListeners. 
   * Sends a message using 'ipcRenderer.send'. 
   * This function seems to be fetching event data and updating the state accordingly. 
   * Problem: trying to change type any to something some concrete. 
   */

  const fetchEventData = useCallback((arg: any) => {
    if (arg === 'kafkametrics') {
      ipcRenderer.removeAllListeners('kafkaResponse');
      ipcRenderer.send('kafkaRequest');
      ipcRenderer.on('kafkaResponse', (event: Electron.Event, data: any) => {
        let result: any;
        if (tryParseJSON(data)) result = JSON.parse(data);
        let transformedData: any = {};
        if (result && result.length > 0) {
          transformedData = transformEventData(result[0]['kafkametrics']);
          setEventData(transformedData);
        }
      });
    } else if (arg === 'kubernetesmetrics') {
      ipcRenderer.removeAllListeners('kubernetesResponse');
      ipcRenderer.send('kubernetesRequest');
      ipcRenderer.on('kubernetesResponse', (event: Electron.Event, data: any) => {
        let result: any;
        if (tryParseJSON(data)) result = JSON.parse(data);
        let transformedData: any = {};
        if (result && result.length > 0) {
          transformedData = transformEventData(result[0]['kubernetesmetrics']);
          setEventData(transformedData);
        }
      });
    }
  }, []);

  // const fetchKafkaEventData = useCallback(() => {
  //   ipcRenderer.removeAllListeners('kafkaResponse');
  //   ipcRenderer.send('kafkaRequest');
  //   ipcRenderer.on('kafkaResponse', (event: Electron.Event, data: any) => {
  //     let result: any;
  //     if (tryParseJSON(data)) result = JSON.parse(data);
  //     let transformedData: any = {};
  //     if (result && result.length > 0) {
  //       transformedData = transformEventData(result[0]['kafkametrics']);
  //       setEventData(transformedData);
  //     }
  //   });
  // }, []);

  // const fetchKubernetesEventData = useCallback(() => {
  //   ipcRenderer.removeAllListeners('kafkaResponse');
  //   ipcRenderer.send('kafkaRequest');
  //   ipcRenderer.on('kafkaResponse', (event: Electron.Event, data: any) => {
  //     let result: any;
  //     if (tryParseJSON(data)) result = JSON.parse(data);
  //     let transformedData: any = {};
  //     if (result && result.length > 0) {
  //       transformedData = transformEventData(result[0]['kafkametrics']);
  //       setEventData(transformedData);
  //     }
  //   });
  // }, []);
/**
 * @function transformEventData - seems like this function tranforms raw data into a format that can be visualize in graphs. 
 */
  const transformEventData = (data: any[]) => {
    const dataList: any[] = [];
    const timeList: any[] = [];
    const metricSet = new Set();
    data.forEach(element => {
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
    return { eventDataList: dataList, eventTimeList: timeList }; 
  };

  return (
    <EventContext.Provider
      value={{
        eventData,
        setEventData,
        fetchEventData,
      }}
    >
      {children}
    </EventContext.Provider>
  );
});
export default EventContextProvider;
