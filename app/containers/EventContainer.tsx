import React, { useEffect, useState, useContext } from 'react';
//import EventContext, EventChart
import { EventContext } from '../context/EventContext';
import { QueryContext } from '../context/QueryContext';
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

  const { eventDataList, eventTimeList } = useContext(EventContext); 
  const [eventChartsArr, setEventChartsArr] = useState<JSX.Element[]>([]);
  const { selectedMetrics } = useContext(QueryContext);


  useEffect(() => {
    const temp : JSX.Element[] = [];
    if (eventDataList.length > 0) {
      // console.log("eventDataList in EventContainer:");
      // console.log(JSON.stringify(eventDataList));
      // console.log("eventTimeList in EventContainer:");
      // console.log(JSON.stringify(eventTimeList));
      let selectedMetricsList : string[] = [];
      selectedMetrics.forEach(element => {
        if(Object.keys(element)[0]==='Event'){
          selectedMetricsList = element['Event'];
        }
      });

      eventDataList.forEach((element, id) => {
      //[{metric1: [3,6,8...]}, {metric2: [3,6,8...]}]  
        const metric: string = Object.keys(element)[0];
        const valueList: any = Object.values(element)[0];
        // console.log("metric in EventContainer:", metric);
        // console.log("valueList in EventContainer:",valueList);
        if(selectedMetricsList.includes(metric)){
          const newEventChart = (
            <EventChart
              key={`Chart${id}`}
              metric={metric}
              timeList={getSingleTimeList(metric)}
              valueList={valueList}
              sizing={props.sizing}
              colourGenerator={props.colourGenerator}
            />
          );
          
          temp.push(newEventChart);
        }
        
      }); 
      setEventChartsArr(temp);
    }
  }, [eventDataList, eventTimeList]);

  const getSingleTimeList = (metricName: string) => {
    //[{metric1: [3,6,8...]}, {metric2: [3,6,8...]}]  
    let lst = [];
    for(let metric of eventTimeList){
      if(Object.keys(metric)[0] === metricName){
        lst = metric[metricName];
        // console.log("timeList in EventContainer:", JSON.stringify(lst));
        break;
        
      }

    }

    return lst;
    
  };

  return <div>{eventChartsArr}</div>;
});

export default EventContainer;
