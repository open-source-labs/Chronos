import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';

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

const GraphsContainer: React.FC<GraphsContainerProps> = React.memo(props => {
  const { app, service } = useParams<any>();
  const [live, setLive] = useState<boolean>(false);
  const [intervalID, setIntervalID] = useState<NodeJS.Timeout | null>(null);

  const { fetchHealthData, setHealthData } = useContext(HealthContext);
  const { fetchDockerData, setDockerData } = useContext(DockerContext);
  const { fetchCommsData } = useContext(CommsContext);

  useEffect(() => {
    if (live) {
      setIntervalID(
        setInterval(() => {
          fetchCommsData(app, live);
          fetchHealthData(service);
          fetchDockerData(service);
        }, 3000)
      );
    } else {
      if (intervalID) clearInterval(intervalID);
      fetchCommsData(app, live);
      fetchHealthData(service);
      fetchDockerData(service);
    }
    // On unmount: clear data and interval
    return () => {
      if (intervalID) clearInterval(intervalID);
      setHealthData({});
      setDockerData({});
    };
  }, [service, live]);

  // Conditionally render the communications or health graphs
  return (
    <>
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
            <SpeedChart />
            <TemperatureChart />
            <LatencyChart />
            <MemoryChart />
            <ProcessesChart />
            <DockerChart />
          </div>
        )}
      </div>
    </>
  );
});

export default GraphsContainer;
