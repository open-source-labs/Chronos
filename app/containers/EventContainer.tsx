import React, { useEffect, useState, useContext } from 'react';
//import EventContext, EventChart
import { EventContext } from '../context/EventContext';
import EventChart from '../charts/EventChart';

interface EventContainerProps {
  sizing: string;
  colourGenerator: Function;
}


const GraphsContainer: React.FC<EventContainerProps> = React.memo((props) => {
  //get eventData from EventContext using react hook useContext
  const { eventData } = useContext(EventContext);
  /* eventData is an object which looks like:
  eventData =
   {
    ActiveControllerCount: 10, 
    OfflinePartitionsCount: 5, 
    UncleanLeaderElectionsPerSec: 2, 
    DiskUsage: 60
  }
  */
   //render a list of EventChart for each eventData metric
  const eventChartsArr : JSX.Element[] = [];
  for(let metric in eventData){
    const metricValue:number = eventData[metric];
    eventChartsArr.push(<EventChart metric = {metric} metricValue = {metricValue} sizing = {props.sizing} colourGenerator = {props.colourGenerator}/>)
  }
 
  return(
    <div>
    {eventChartsArr}
    </div>
  )


});


export default GraphsContainer;
