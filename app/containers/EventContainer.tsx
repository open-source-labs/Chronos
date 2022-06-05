import React, { useEffect, useState, useContext } from 'react';
//import EventContext, EventChart
import { EventContext } from '../context/EventContext';
import EventChart from '../charts/EventChart';
import HealthContextProvider from '../context/HealthContext';
import { transformFile } from '@babel/core';
import { json } from 'd3';

interface EventContainerProps {
  sizing: string;
  colourGenerator: Function;
}

const EventContainer: React.FC<EventContainerProps> = React.memo(props => {
  //get eventData from EventContext using react hook useContext

  const { eventData } = useContext(EventContext); //eventData: [{time: xx, m1: xx, m2: xx}, {}, {}..]
  const [eventChartsArr, setEventChartsArr] = useState<JSX.Element[]>([]);

  //everytime eventData change, create eventChartsArr based on current eventData
  useEffect(() => {
    const temp : JSX.Element[] = [];
    let i = 0;
    if (eventData.length > 0) {
      // console.log("eventData in event container changes:")
      //console.log(JSON.stringify(eventData));
      const dataList = transformEventData(eventData)[0]; //[{m1: [3,6,8...]}, {m2: [3,6,8...]}]
      const timeList = transformEventData(eventData)[1]; //[1,2,3,4,...,50]
      // console.log("datalist:", JSON.stringify(dataList));
      // console.log("timelist:", JSON.stringify(timeList));
      
      dataList.forEach((element, id) => {
        //element: {m1: [3,6,8...]}
        const metric: string = Object.keys(element)[0];
        const valueList: any = Object.values(element)[0];
        const newEventChart = (
          <EventChart
            key={`Chart${id}`}
            metric={metric}
            timeList={timeList}
            valueList={valueList}
            sizing={props.sizing}
            colourGenerator={props.colourGenerator}
          />
        );
        
        temp.push(newEventChart);
       
      }); 
      setEventChartsArr(temp);
    }
  }, [eventData]);

  const transformEventData = (eventData: any) => {
    const dataList: any[] = [];
    let timeList: any[] = [];
    const sampleObj: {} = eventData[0];
    for (let key in sampleObj) {
      const keyValueList: {} = {}; //{time: [1,2,3,4,...,50]} //{m1: [3,6,8...]}
      keyValueList[key] = [];
      for (let i = 0; i < eventData.length; i++) {
        const obj: {} = eventData[i];
        keyValueList[key].push(obj[key]);
      }
      if (key === 'time') {
        timeList = keyValueList[key]; //[1,2,3,4,...,50]
      } else {
        dataList.push(keyValueList); //[{m1: [3,6,8...]}, {m2: [3,6,8...]}]
      }
    }
    return [dataList, timeList];
  };

  return <div>{eventChartsArr}</div>;
});

export default EventContainer;
