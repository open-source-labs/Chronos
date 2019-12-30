import React from 'react';
import RequestTypesChart from '../charts/request-type-chart.jsx';
import ResponseCodesChart from '../charts/response-code-chart.jsx';
import RouteTrace from '../charts/route-trace.jsx';
import SpeedChart from '../charts/speed-chart.jsx';
import ProcessesChart from '../charts/processes-chart.jsx';
import TemperatureChart from '../charts/temperature-chart.jsx'
import LatencyChart from '../charts/latency-chart.jsx';
import MemoryChart from '../charts/memory-chart.jsx';

// Renders charts created with health and communication data for a selected database.
const ServiceDetails = (props) => {
  return (
    <div>
      <button className="backButton" type="button" onClick={() => document.location.reload()}>Back</button>
      <div>
        <h3>Request Types</h3>
        <RequestTypesChart service={props.service} />
      </div>
      <div>
        <h3>Response Codes </h3>
        <ResponseCodesChart service={props.service} />
      </div>
      <div>
        <h3>Route Trace</h3>
         <RouteTrace service={props.service} />
      </div>
      <div>
        <h3>Speed Chart</h3>
        <SpeedChart service={props.service} />
      </div>
      <div>
        <h3>Processes Chart</h3>
        <ProcessesChart service={props.service} />
      </div>
      <div>
        <h3>Latency</h3>
        <LatencyChart service={props.service} />
      </div>
      <div>
        <h3>Temperature Chart</h3>
        <TemperatureChart service={props.service} />
      </div>
      <div>
        <h3>Memory Chart</h3>
        <MemoryChart service={props.service} />
      </div>
    </div>
  );
};

export default ServiceDetails;
