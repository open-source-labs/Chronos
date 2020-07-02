import React, { useState, useEffect, useRef, useContext } from 'react';
import { HealthContext } from '../context/HealthContext';
import { CommsContext } from '../context/CommsContext';
import { DockerContext } from '../context/DockerContext';
import { ApplicationContext } from '../context/ApplicationContext';
import RequestTypesChart from '../charts/request-type-chart';
import ResponseCodesChart from '../charts/response-code-chart';
import MicroServiceTraffic from '../charts/microservice-traffic';
import SpeedChart from '../charts/speed-chart';
import ProcessesChart from '../charts/processes-chart';
import TemperatureChart from '../charts/temperature-chart';
import LatencyChart from '../charts/latency-chart';
import MemoryChart from '../charts/memory-chart';
import RouteTrace from '../charts/route-trace';
import DockerChart from '../charts/DockerChart';
import '../stylesheets/GraphsContainer.css';

interface IParams {
  service: string;
}

interface IMatch {
  match: {
    path: string;
    url: string;
    isExact: boolean;
    params: IParams;
  };
}

const GraphsContainer = ({ match }: IMatch) => {
  const [live, setLive] = useState<boolean>(false);
  const [intervalID, setIntervalID] = useState<NodeJS.Timeout | null>(null)
  //   const initialData = {
  //   nodes: [{ id: 'reverse-proxy' }, { id: 'books' }, { id: 'customers' }, { id: 'orders' }],
  //   links: [
  //     { source: 'reverse-proxy', target: 'books' },
  //     { source: 'reverse-proxy', target: 'customers' },
  //     { source: 'reverse-proxy', target: 'orders' },
  //     { source: 'books', target: 'orders' },
  //     { source: 'customers', target: 'books' },
  //     { source: 'orders', target: 'customers' },
  //   ],
  // };

  const [data, setData] = useState(null);
  const width = 400;
  const height = 400;
  const [active, setActive] = useState(null);
  const canvas = useRef(null);

  // function fetchData() {
  //   Promise.resolve().then(() => setData(Object.values(initialData)));
  // }

  // useEffect(() => {
  //   if (data && data.length) {
  //     const d3Props = {
  //       data,
  //       width,
  //       height,
  //       onClick: setActive,
  //     };
  //     new RouteTrace(canvas.current, d3Props);
  //   }
  // }, [data]);

  // useEffect(fetchData, []);

  // Get current service name from params
  const { service } = match.params;

  const { fetchHealthData, setHealthData } = useContext(HealthContext);
  const { fetchCommsData, setCommsData } = useContext(CommsContext);
  const { fetchDockerData, setDockerData } = useContext(DockerContext);
  const { app } = useContext(ApplicationContext);

  // On Mount: fetch communication data and health data
  useEffect(() => {
    if (live) {
      setIntervalID(setInterval(function () {
        fetchCommsData();
        fetchHealthData(service);
        fetchDockerData(service);
      }, 3000));
    } else {
      if (intervalID) clearInterval(intervalID)
      fetchCommsData();
      fetchHealthData(service);
      fetchDockerData(service);
    }
    // On unmount: clear data
    return () => {
      setHealthData({});
      setCommsData([]);
      setDockerData({});
    };
  }, [service, live]);

  return (
    <div className="graphs-container">
      <div className="headers">
        <h3 className="header-app">Application: {app}</h3>
        <h3 className="header-service">Microservice: {service}</h3>
        <button onClick={() => setLive(!live)}>
          {live ? <div><span className="dot"></span>Live</div> : <div>Gather Live Data</div>}
        </button>
      </div>
      <div className="graphsGrid">
        <SpeedChart />
        <TemperatureChart />
        <RequestTypesChart />
        <ResponseCodesChart />
        <ProcessesChart />
        <LatencyChart />
        <MicroServiceTraffic />
        <MemoryChart />
        <DockerChart />
      </div>
    </div>
  );
};

export default GraphsContainer;
