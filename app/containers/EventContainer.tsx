import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { EventContext } from '../context/EventContext';
import { QueryContext } from '../context/QueryContext';
import EventChart from '../charts/EventChart';
import { Button } from '@material-ui/core';

interface EventContainerProps {
  sizing: string;
  colourGenerator: Function;
}

interface Params {
  service: string;
}

const EventContainer: React.FC<EventContainerProps> = React.memo(props => {
  const { eventData } = useContext(EventContext);
  const [eventChartsArr, setEventChartsArr] = useState<JSX.Element[]>([]);
  const { selectedMetrics } = useContext(QueryContext);
  const eventDataList: any[] = eventData.eventDataList;
  const eventTimeList: any[] = eventData.eventTimeList;
  const { service } = useParams<keyof Params>() as Params;
  const [currIndex, setCurrIndex] = useState(0);
  const [currChunk, setCurrChunk] = useState<JSX.Element[]>([]);
  const chunkSize = 7;

  useEffect(() => {
    const temp: JSX.Element[] = [];
    if (eventData && eventDataList.length > 0 && eventTimeList.length > 0) {
      let selectedMetricsList: string[] = [];
      selectedMetrics.forEach(element => {
        if (Object.keys(element)[0] === 'Event') {
          selectedMetricsList = element['Event'];
        }
      });

      eventDataList.forEach((element, id) => {
        const metric: string = Object.keys(element)[0];
        const valueList: any = Object.values(element)[0];
        if (selectedMetricsList.includes(metric)) {
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
      setCurrChunk(temp.slice(currIndex, currIndex + chunkSize));
      setCurrIndex(currIndex + chunkSize);
    }
  }, [eventData, service]);

  const getSingleTimeList = (metricName: string) => {
    let lst = [];
    for (let metric of eventTimeList) {
      if (Object.keys(metric)[0] === metricName) {
        lst = metric[metricName];
        break;
      }
    }
    return lst;
  };

  console.log('CHUNKS', currChunk);

  function nextChunk() {
    const nextChunk = eventChartsArr.slice(currIndex, currIndex + chunkSize);
    setCurrChunk(nextChunk);
    setCurrIndex(currIndex + chunkSize);
  }

  function prevChunk() {
    const prevChunk = eventChartsArr.slice(currIndex - (2 * chunkSize), currIndex - chunkSize);
    setCurrChunk(prevChunk);
    setCurrIndex(currIndex - chunkSize); 
  }

  return (
    <div>
      {service.includes('kafkametrics') || service.includes('kubernetesmetrics') ? currChunk : []}
      {eventChartsArr.length > chunkSize && (
        <>
          <Button id="getCharts" onClick={prevChunk} variant="contained" color="primary" disabled={currIndex <= chunkSize }>
            Prev
          </Button>
          <Button id="getCharts" onClick={nextChunk} variant="contained" color="primary" disabled={currIndex >= eventChartsArr.length}>
            Next
          </Button>
        </>
      )}
    </div>
  );
});

export default EventContainer;
