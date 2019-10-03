import React, { useEffect, useState, useContext } from 'react';
import HealthInformationContext from '../context/DetailsContext';
import RequestTypesChart from '../charts/request-type-chart.jsx';
import ResponseCodesChart from '../charts/response-code-chart.jsx';
// import SpeedChart from '../charts/speed-chart.jsx';
import MemoryChart from '../charts/memory-chart.jsx';

const { ipcRenderer } = window.require('electron');

const ServiceDetails = (props) => {
  const healthdata = useContext(HealthInformationContext);

  useEffect(() => {
    // IPC communication used to initiate query for information on microservices.
    ipcRenderer.send('detailsRequest', props.index);

    // IPC listener responsible for retrieving infomation from asynchronous main process message.
    ipcRenderer.on('detailsResponse', (event, data) => {
      healthdata.detailData = [...JSON.parse(data)];
    });
  }, []);

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
        <MemoryChart />
      </div>
    </div>
  );
};

export default ServiceDetails;
