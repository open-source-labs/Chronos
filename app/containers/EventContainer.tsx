import React, { useEffect, useState, useContext } from 'react';
//import EventContext, EventChart
import { EventContext } from '../context/EventContext';
import EventChart from '../charts/EventChart';

interface EventContainerProps {
  sizing: string;
  colourGenerator: Function;
}


const EventContainer: React.FC<EventContainerProps> = React.memo((props) => {
  //get eventData from EventContext using react hook useContext
  
  const { eventData } = useContext(EventContext);


  // eventData is an object which looks like:
  // const eventData =
  //  {
  //   ActiveControllerCount: 10, 
  //   OfflinePartitionsCount: 5, 
  //   UncleanLeaderElectionsPerSec: 2, 
  //   DiskUsage: 60
  // }
  //
   //render a list of EventChart for each eventData metric
  const eventChartsArr : JSX.Element[] = [];
  let id = 0;
  for(let metric in eventData){
    const metricValue:number = eventData[metric];
    const obj = {'metric': metric, 'metricValue': metricValue};
    eventChartsArr.push(<EventChart key={`Chart{id}`} eventDataObj = {obj} sizing = {props.sizing} colourGenerator = {props.colourGenerator}/>)
    id++;
  }

  return(
    <div>
    {eventChartsArr}
    </div>
  )

});


export default EventContainer;
