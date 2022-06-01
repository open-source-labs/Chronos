/* eslint-disable no-bitwise */
import React, { useEffect, useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { ApplicationContext } from '../context/ApplicationContext';

import { HealthContext } from '../context/HealthContext';
import { CommsContext } from '../context/CommsContext';
import { DockerContext } from '../context/DockerContext';
//import EventContext
import { EventContext } from '../context/EventContext';

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
//import EventContainer
import EventContainer from './EventContainer';

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
  const { app, service, broker } = useParams<any>();
  const [live, setLive] = useState<boolean>(false);
  const [intervalID, setIntervalID] = useState<NodeJS.Timeout | null>(null);

  const { servicesData } = useContext(ApplicationContext);

  const { fetchHealthData, setHealthData, services } = useContext(HealthContext);
  const { setDockerData, dockerData } = useContext(DockerContext);
  const { fetchEventData, setEventData, eventData } = useContext(EventContext);
  const { fetchCommsData } = useContext(CommsContext);
  const [chart, setChart] = useState<string>('all');

  const [prevRoute, setPrevRoute] = useState<string>('');

  useEffect(() => {
    const serviceArray = service.split(' ');

    if (live) {
      setIntervalID(
        setInterval(() => {
          fetchCommsData(app, live);
          fetchHealthData(serviceArray);
          fetchEventData(broker);
        }, 3000)
      );
    } else {
      if (intervalID) clearInterval(intervalID);
      fetchCommsData(app, live);
      fetchHealthData(serviceArray);
      fetchEventData(broker)
    }

    return () => {
      if (intervalID) clearInterval(intervalID);
      setHealthData({});
      setDockerData({});
      setEventData({});
      
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

  return (
    <>
      <nav>
        <button
          className={chart === 'all' ? 'selected' : undefined}
          id="all-button"
          onClick={() => routing('all')}
        >
          All
        </button>
        <button
          id="speed-button"
          className={chart === 'speed' ? 'selected' : undefined}
          onClick={() => routing('speed')}
        >
          Speed
        </button>
        <button
          id="temp-button"
          className={chart === 'temp' ? 'selected' : undefined}
          onClick={() => routing('temp')}
        >
          Temperature
        </button>
        <button
          id="latency-button"
          className={chart === 'latency' ? 'selected' : undefined}
          onClick={() => routing('latency')}
        >
          Latency
        </button>
        <button
          id="memory-button"
          className={chart === 'memory' ? 'selected' : undefined}
          onClick={() => routing('memory')}
        >
          Memory
        </button>
        <button
          id="process-button"
          className={chart === 'process' ? 'selected' : undefined}
          onClick={() => routing('process')}
        >
          Processes
        </button>
        {dockerData.containername && (
          <button
            id="docker-button"
            className={chart === 'docker' ? 'selected' : undefined}
            onClick={() => routing('docker')}
          >
            Docker
          </button>
        )}
        {/* add event button */}
        <button
          id="event-button"
          className={chart === 'event' ? 'selected' : undefined}
          onClick={() => routing('event')}
        >
          Event
        </button> 
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
            {chart === 'speed' && <SpeedChart colourGenerator={stringToColour} sizing="solo" />}
            {chart === 'temp' && (
              <TemperatureChart colourGenerator={stringToColour} sizing="solo" />
            )}
            {chart === 'latency' && <LatencyChart colourGenerator={stringToColour} sizing="solo" />}
            {chart === 'memory' && <MemoryChart colourGenerator={stringToColour} sizing="solo" />}
            {chart === 'process' && (
              <ProcessesChart colourGenerator={stringToColour} sizing="solo" />
            )}
            {chart === 'docker' && <DockerChart />}
            {/* add event container */}
            {chart === 'event' && <EventContainer colourGenerator={stringToColour} sizing="solo" />}
            {chart === 'all' && (
              <>
                <SpeedChart colourGenerator={stringToColour} sizing="all" />
                <TemperatureChart colourGenerator={stringToColour} sizing="all" />
                <LatencyChart colourGenerator={stringToColour} sizing="all" />
                <MemoryChart colourGenerator={stringToColour} sizing="all" />
                <ProcessesChart colourGenerator={stringToColour} sizing="all" />
                <DockerChart />
                <EventContainer colourGenerator={stringToColour} sizing="all" />
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
});

export default GraphsContainer;
