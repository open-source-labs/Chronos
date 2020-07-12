import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { HealthContext } from '../context/HealthContext';
import { CommsContext } from '../context/CommsContext';
import { DockerContext } from '../context/DockerContext';
import Header from '../components/Header';
import SpeedChart from '../charts/speed-chart';
import TemperatureChart from '../charts/temperature-chart';
import LatencyChart from '../charts/latency-chart';
import ProcessesChart from '../charts/processes-chart';
import MemoryChart from '../charts/memory-chart';
import RequestTypesChart from '../charts/request-type-chart';
import ResponseCodeChart from '../charts/response-code-chart';
import MicroServiceTraffic from '../charts/microservice-traffic';
import DockerStatsChart from '../charts/DockerChart';
import RouteTrace from '../charts/route-trace';
import '../stylesheets/GraphsContainer.css';

export interface Params {
  app: string;
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

const GraphsContainer: React.SFC<GraphsContainerProps> = () => {
  const { app, service } = useParams();
  const [live, setLive] = useState<boolean>(false);
  const [intervalID, setIntervalID] = useState<NodeJS.Timeout | null>(null);

  const { fetchHealthData, setHealthData } = useContext(HealthContext);
  const { fetchCommsData, setCommsData } = useContext(CommsContext);
  const { fetchDockerData, setDockerData } = useContext(DockerContext);

  useEffect(() => {
    if (live) {
      setIntervalID(
        setInterval(function () {
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
    // On unmount: clear data
    return () => {
      if (intervalID) clearInterval(intervalID);
      setHealthData({});
      setDockerData({});
    };
  }, [service, live]);

  return (
    <>
      <Header app={app} service={service} live={live} setLive={setLive} />
      <div>
        {service === 'communications' ? (
          <>
            <RequestTypesChart />
            <ResponseCodeChart />
            <MicroServiceTraffic />
          </>
        ) : (
          <>
            <SpeedChart />
            <TemperatureChart />
            <LatencyChart />
            <MemoryChart />
            <ProcessesChart />
            <DockerStatsChart />
          </>
        )}
      </div>
    </>
  );
};

export default GraphsContainer;
