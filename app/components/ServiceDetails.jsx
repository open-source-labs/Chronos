import React, { useEffect, useContext } from 'react';
import HealthInformationContext from '../context/DetailsContext';
import RequestTypesChart from '../charts/request-type-chart.jsx';
import ResponseCodesChart from '../charts/response-code-chart.jsx';
import SpeedChart from '../charts/speed-chart.jsx';
import MemoryChart from '../charts/memory-chart.jsx';
import LatencyChart from '../charts/latency-chart.jsx';

const { ipcRenderer } = window.require('electron');

const ServiceDetails = (props) => {
  return (
    <div>
      <div>
        <h3>Request Types</h3>
        <RequestTypesChart />
      </div>
      <div>
        <h3>Response Codes</h3>
        <ResponseCodesChart />
      </div>
      <div>
        <h3>Memory Chart</h3>
        <MemoryChart service={props.service} />
      </div>
      <div>
        <h3>Latency</h3>
        <LatencyChart service={props.service}/>
      </div>
    </div>
  );
};

export default ServiceDetails;
