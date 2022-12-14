import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { EventContext } from '../context/EventContext';
import { QueryContext } from '../context/QueryContext';
import EventChart from '../charts/EventChart';

interface EventContainerProps {
  sizing: string;
  colourGenerator: Function;
}

const EventContainer: React.FC<EventContainerProps> = React.memo(props => {
  const { eventData } = useContext(EventContext);
  const [eventChartsArr, setEventChartsArr] = useState<JSX.Element[]>([]);
  const { selectedMetrics } = useContext(QueryContext);
  const eventDataList: any[] = eventData.eventDataList;
  const eventTimeList: any[] = eventData.eventTimeList;
  const { service } = useParams<any>();

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
  // JJ-ADDITION
  return <div>{service.includes('kafkametrics' || 'kubernetesmetrics') ? eventChartsArr : []}</div>;
  // return <div>{service.includes('kafkametrics') ? eventChartsArr : []}</div>;
});

export default EventContainer;
