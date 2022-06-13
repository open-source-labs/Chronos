/* eslint-disable no-bitwise */
import React, { useEffect, useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { ApplicationContext } from '../context/ApplicationContext';

import { HealthContext } from '../context/HealthContext';
import { CommsContext } from '../context/CommsContext';
import { DockerContext } from '../context/DockerContext';
import { EventContext } from '../context/EventContext';
import { QueryContext } from '../context/QueryContext';

import Header from '../components/Header';

import SpeedChart from '../charts/SpeedChart';
import TemperatureChart from '../charts/TemperatureChart';
import LatencyChart from '../charts/LatencyChart';
import ProcessesChart from '../charts/ProcessesChart';
import MemoryChart from '../charts/MemoryChart';
import RequestTypesChart from '../charts/RequestTypesChart';
import ResponseCodesChart from '../charts/ResponseCodesChart';
import TrafficChart from '../charts/TrafficChart';
import DockerChart from '../charts/DockerChart';
import RouteChart from '../charts/RouteChart';

import LogsTable from '../charts/LogsTable';
//import HealthContainer from './HealthContainer';
import EventContainer from './EventContainer';
import QueryContainer from './QueryContainer';
import HealthContainer from './HealthContainer';

import '../stylesheets/GraphsContainer.scss';

export interface Params {
  app: any;
  service: string;
}

export interface GraphsContainerProps {
  match: {
    path: string;
    url: string;
    isExact: boolean;
    params: Params;
  };
}

const GraphsContainer: React.FC<GraphsContainerProps> = React.memo(props => {
  const history = useHistory();
  const { app, service } = useParams<any>();
  const [live, setLive] = useState<boolean>(false);
  const [intervalID, setIntervalID] = useState<NodeJS.Timeout | null>(null);

  const { servicesData } = useContext(ApplicationContext);

  const { fetchHealthData, setDataList, setTimeList, services } = useContext(HealthContext);
  const { setDockerData, dockerData } = useContext(DockerContext);
  const { fetchEventData, setEventDataList, setEventTimeList } = useContext(EventContext);
  const { fetchCommsData } = useContext(CommsContext);
  const { selectedMetrics } = useContext(QueryContext);
  const { setTimeList, setDataList } = useContext(HealthContext);

  const [chart, setChart] = useState<string>('all');

  const [prevRoute, setPrevRoute] = useState<string>('');

  useEffect(() => {
    const serviceArray = service.split(' ');

    if (live) {
      setIntervalID(
        setInterval(() => {
          fetchCommsData(app, live);
          fetchHealthData(serviceArray);
          fetchEventData();
        }, 3000)
      );
    } else {
      if (intervalID) clearInterval(intervalID);
      fetchCommsData(app, live);
      fetchHealthData(serviceArray);
      fetchEventData();
    }

    return () => {
      if (intervalID) clearInterval(intervalID);
      setDataList([]);
      setTimeList([]);
      setDockerData({});
      setEventDataList([]);
      setEventTimeList([]);
    };
  }, [service, live]);

  const routing = (route: string) => {
    if (location.href.includes('communications')) {
      if (prevRoute === '') history.replace(`${servicesData[0].microservice}`);
      else history.replace(prevRoute);
    }
    setChart(route);
  };

  const stringToColour = (string: string, recurses = 0) => {
    if (recurses > 20) return string;
    function hashString(str: string) {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      let colour = '#';
      for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xff;
        colour += `00${value.toString(16)}`.substr(-2);
      }
      return colour;
    }
    function contrastYiq(color: string) {
      const num = parseInt(color.slice(1), 16);
      const r = (num >>> 16) & 0xff;
      const g = (num >>> 8) & 0xff;
      const b = num & 0xff;
      const yiq = (r * 299 + g * 587 + b * 114) / 1000;
      return yiq <= 50 ? stringToColour(color, recurses + 1) : color;
    }
    for (let salt = 0; salt < 5; salt++) string = hashString(string);
    return contrastYiq(string);
  }; // This is a work of pure genius and also probably why the app is infinitely recursing

  const getHealthAndEventComponents = () => {
    const buttonList: JSX.Element[] = [];
    if (selectedMetrics) {
      selectedMetrics.forEach(element => {
        const categoryName = Object.keys(element)[0];
        const prefix = categoryName === 'Event' ? 'event_' : 'health_';
        buttonList.push(
          <button
            id={`${prefix}${categoryName}-button`}
            className={chart === `${prefix}${categoryName}` ? 'selected' : undefined}
            onClick={() => routing(`${prefix}${categoryName}`)}
          >
            {categoryName}
          </button>
        );
      });
    }

    return buttonList;
  };

  const HealthAndEventButtons: JSX.Element[] = getHealthAndEventComponents();

  return (
    <>
      <nav>
        <button
          className={chart === 'all' ? 'selected' : undefined}
          id="all-button"
          onClick={() => routing('all')}
        >
          Metrics Query
        </button>
        {HealthAndEventButtons}
        {dockerData.containername && (
          <button
            id="docker-button"
            className={chart === 'docker' ? 'selected' : undefined}
            onClick={() => routing('docker')}
          >
            Docker
          </button>
        )}
        <button
          id="communication-button"
          className={chart === 'communications' ? 'selected' : undefined}
          onClick={() => {
            if (!location.href.includes('communications')) setPrevRoute(services.join(' '));
            setChart('communications');
            history.push('communications');
          }}
        >
          Communication
        </button>
      </nav>
      <Header app={app} service={service} live={live} setLive={setLive} />
      <div className="graphs-container">
        {service === 'communications' ? (
          <div className="graphs">
            <RequestTypesChart />
            <ResponseCodesChart />
            <TrafficChart />
            <RouteChart />
            <LogsTable />
          </div>
        ) : (
          <div className="graphs">
            {chart === 'all' && <QueryContainer />}
<<<<<<< HEAD
            {chart.startsWith('health_') && (
              <HealthContainer
                colourGenerator={stringToColour}
                sizing="solo"
                category={chart.substring(7)}
              />
            )}
            {chart.startsWith('event_') && (
              <EventContainer colourGenerator={stringToColour} sizing="solo" />
            )}
=======
            {chart.startsWith('health_') 
            // && (
            // <HealthContainer colourGenerator={stringToColour} sizing="solo" category={chart.substring(7)}/>
            // )
            }
            {chart.startsWith('event_') && <EventContainer colourGenerator={stringToColour} sizing="solo" />}
>>>>>>> dev
            {chart === 'docker' && <DockerChart />}
          </div>
        )}
      </div>
    </>
  );
});

export default GraphsContainer;
