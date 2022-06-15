import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
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

  const { eventData, setEventData } = useContext(EventContext); 
  // const { eventDataList, eventTimeList } = useContext(EventContext); 
  const [eventChartsArr, setEventChartsArr] = useState<JSX.Element[]>([]);
  const { selectedMetrics } = useContext(QueryContext);
  const eventDataList : any[] = eventData.eventDataList;
  const eventTimeList : any[] = eventData.eventTimeList;
  const { service } = useParams<any>();


  useEffect(() => {
    const temp : JSX.Element[] = [];
    console.log("service in event container", service);
    if (eventData && eventDataList.length > 0 && eventTimeList.length >0) {
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
          console.log("count in eventcontainer: ", id);
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
  }, [eventData, service]);

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

  return <div>{service.includes('kafkametrics')? eventChartsArr : []}</div>;
});

export default EventContainer;
