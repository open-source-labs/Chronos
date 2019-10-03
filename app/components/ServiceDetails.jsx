import React, { useEffect, useState, useContext } from 'react';
import HealthInformationContext from '../context/DetailsContext';
import RequestTypesChart from '../charts/request-type-chart.jsx';
import ResponseCodesChart from '../charts/response-code-chart.jsx';
import SpeedChart from '../charts/speed-chart.jsx';

const { ipcRenderer } = window.require('electron');

const ServiceDetails = (props) => {
  const healthdata = useContext(HealthInformationContext);
  const [detailsState, setDetails] = useState();


  useEffect(() => {
    // IPC communication used to initiate query for information on microservices.
    ipcRenderer.send('detailsRequest', props.index);
 
    // IPC listener responsible for retrieving infomation from asynchronous main process message.
    ipcRenderer.on('detailsResponse', (event, data) => {
      setDetails(Object.values(JSON.parse(data)));
      healthdata.detailData = detailsState;
    });
  }, []);
 
  console.log(detailsState);
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
        {/* <h3>Speed Chart</h3>
        <SpeedChart /> */}
      </div>
    </div>
  );
};

export default ServiceDetails;
