import React from 'react';
import RequestTypesChart from '../charts/request-type-chart.jsx';
import ResponseCodesChart from '../charts/response-code-chart.jsx';
import SpeedChart from '../charts/speed-chart.jsx';
import ProcessesChart from '../charts/processes-chart.jsx';
// import MemoryChart from '../charts/memory-chart.jsx';

const ServiceDetails = (props) => {
  return (
    <div>
      <div>
        <h3>Request Types</h3>
        <RequestTypesChart service={props.service} />
      </div>
      <div>
        <h3>Response Codes </h3>
        <ResponseCodesChart service={props.service} />
      </div>
      <div>
        <h3>Speed Chart</h3>
        <SpeedChart service={props.service} />
      </div>
      <div>
        <h3>Processes Chart</h3>
        <ProcessesChart service={props.service} />
      </div>
    </div>
  );
};

export default ServiceDetails;
