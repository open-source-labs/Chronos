import React, { useState, useEffect, useRef, useContext } from 'react';
import { HealthContext } from '../context/HealthContext';
import { CommsContext } from '../context/CommsContext';
import RequestTypesChart from '../charts/request-type-chart';
import ResponseCodesChart from '../charts/response-code-chart';
import MicroServiceTraffic from '../charts/microservice-traffic';
import SpeedChart from '../charts/speed-chart';
import ProcessesChart from '../charts/processes-chart';
import TemperatureChart from '../charts/temperature-chart';
import LatencyChart from '../charts/latency-chart';
import MemoryChart from '../charts/memory-chart';
import RouteTrace from '../charts/route-trace';
import DockerStatsChart from '../charts/docker-stats-chart';
import '../stylesheets/GraphsContainer.css';

const GraphsContainer = ({ service }) => {
  const initialData = {
    nodes: [{ id: 'reverse-proxy' }, { id: 'books' }, { id: 'customers' }, { id: 'orders' }],
    links: [
      { source: 'reverse-proxy', target: 'books' },
      { source: 'reverse-proxy', target: 'customers' },
      { source: 'reverse-proxy', target: 'orders' },
      { source: 'books', target: 'orders' },
      { source: 'customers', target: 'books' },
      { source: 'orders', target: 'customers' },
    ],
  };

  const [data, setData] = useState(null);
  const width = 400;
  const height = 400;
  const [active, setActive] = useState(null);
  const canvas = useRef(null);

  function fetchData() {
    Promise.resolve().then(() => setData(Object.values(initialData)));
  }

  useEffect(() => {
    if (data && data.length) {
      const d3Props = {
        data,
        width,
        height,
        onClick: setActive,
      };
      new RouteTrace(canvas.current, d3Props);
    }
  }, [data]);

  useEffect(fetchData, []);

  // New fetch call here, change service to serviceName everywhere in here when ready:
  const { fetchHealthData, healthData } = useContext(HealthContext);
  const { fetchCommsData, commsData } = useContext(CommsContext);

  useEffect(() => {
    fetchCommsData(99);
    fetchHealthData(service);
  }, []);
  console.log('in the comDidmount', healthData);
  console.log('in comp did mount', commsData);

  return (
    <div className="graphsGrid">
      {/* Where we might render the Date Component */}
      <div className="routes">
        <div ref={canvas} />
      </div>
      <SpeedChart service={service} />
      <TemperatureChart service={service} />
      <RequestTypesChart service={service} />
      <ResponseCodesChart service={service} />
      <ProcessesChart service={service} />
      <LatencyChart service={service} />
      <MicroServiceTraffic service={service} />
      <MemoryChart service={service} />
      <DockerStatsChart service={service} />
    </div>
  );
};

export default GraphsContainer;
