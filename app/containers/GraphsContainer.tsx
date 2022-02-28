import React, { useEffect, useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { HealthContext } from '../context/HealthContext';
import { CommsContext } from '../context/CommsContext';
import { DockerContext } from '../context/DockerContext';
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

/**
 * pathname: "/applications/ToddDB/chronos-mon"
 * pathname: "/applications/ToddDB/chronos-mon+chronos-mon2"
 * pathname: "/applications/ToddDB/service?server=chronos-mon+chronos-mon2"
 *
 *
 *
 */

const GraphsContainer: React.FC<GraphsContainerProps> = React.memo(props => {
  const history = useHistory();
  const { app, service } = useParams<any>();
  const [live, setLive] = useState<boolean>(false);
  const [intervalID, setIntervalID] = useState<NodeJS.Timeout | null>(null);

  const { fetchHealthData, setHealthData, healthData } = useContext(HealthContext);
  const { fetchDockerData, setDockerData } = useContext(DockerContext);
  const { fetchCommsData } = useContext(CommsContext);
  const [chart, setChart] = useState<string>('speed');
  const [sizing, setSizing] = useState<string>('solo');

  useEffect(() => {
    // console.log(service);
    const serviceArray = service.split(' ');

    if (live) {
      setIntervalID(
        setInterval(() => {
          fetchCommsData(app, live);
          fetchHealthData(serviceArray);
          // fetchDockerData(serviceArray);
        }, 3000)
      );
    } else {
      if (intervalID) clearInterval(intervalID);
      fetchCommsData(app, live);
      fetchHealthData(serviceArray);
      // fetchDockerData(serviceArray);
    }
    // On unmount: clear data and interval
    return () => {
      if (intervalID) clearInterval(intervalID);
      setHealthData({});
      setDockerData({});
    };
  }, [service, live]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     console.log('in GC', healthData);
  //   }, 5000);
  // }, [healthData]);

  // Conditionally render the communications or health graphs
  return (
    <>
      <nav>
        <button
          className={chart === 'all' ? 'selected' : undefined}
          id="all-button"
          onClick={() => setChart('all')}
        >
          All
        </button>
        <button
          id="speed-button"
          className={chart === 'speed' ? 'selected' : undefined}
          onClick={() => setChart('speed')}
        >
          Speed
        </button>
        <button
          id="temp-button"
          className={chart === 'temp' ? 'selected' : undefined}
          onClick={() => setChart('temp')}
        >
          Temperature
        </button>
        <button
          id="latency-button"
          className={chart === 'latency' ? 'selected' : undefined}
          onClick={() => setChart('latency')}
        >
          Latency
        </button>
        <button
          id="memory-button"
          className={chart === 'memory' ? 'selected' : undefined}
          onClick={() => setChart('memory')}
        >
          Memory
        </button>
        <button
          id="process-button"
          className={chart === 'process' ? 'selected' : undefined}
          onClick={() => setChart('process')}
        >
          Processes
        </button>
        <button
          id="docker-button"
          className={chart === 'docker' ? 'selected' : undefined}
          onClick={() => setChart('docker')}
        >
          Docker
        </button>
        <button id="communication-button" onClick={() => history.replace('communications')}>
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
            {chart === 'speed' && <SpeedChart sizing="solo" />}
            {chart === 'temp' && <TemperatureChart sizing="solo" />}
            {chart === 'latency' && <LatencyChart sizing="solo" />}
            {chart === 'memory' && <MemoryChart sizing="solo" />}
            {chart === 'process' && <ProcessesChart sizing="solo" />}
            {chart === 'docker' && <DockerChart />}

            {chart === 'all' && (
              <>
                <SpeedChart sizing="all" />
                <TemperatureChart sizing="all" />
                <LatencyChart sizing="all" />
                <MemoryChart sizing="all" />
                <ProcessesChart sizing="all" />
                <DockerChart />
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
});

export default GraphsContainer;
