import React from 'react';
import RequestTypesChart from '../charts/request-type-chart.jsx';
import ResponseCodesChart from '../charts/response-code-chart.jsx';
import SpeedChart from '../charts/speed-chart.jsx';
import ProcessesChart from '../charts/processes-chart.jsx';
import TemperatureChart from '../charts/temperature-chart.jsx';
import LatencyChart from '../charts/latency-chart.jsx';
import MemoryChart from '../charts/memory-chart.jsx';
import RouteTrace from '../charts/route-trace.jsx';
import MicroServiceTraffic from '../charts/microservice-traffic.jsx';
import '../stylesheets/graphs.css';

const GraphsContainer = (props) => {
  const { service } = props;

  return (
    <div className="graphsGrid">
      <SpeedChart service={service} />
      <RequestTypesChart service={service} />
      <ResponseCodesChart service={service} />
      <ProcessesChart service={service} />
      <LatencyChart service={service} />
      <MicroServiceTraffic service={service} />
      <TemperatureChart service={service} />
      <MemoryChart service={service} />
      <RouteTrace service={service} />
    </div>
  );
};

export default GraphsContainer;
