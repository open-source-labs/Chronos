import React, { useEffect, useState, useContext } from 'react';
import HealthInformationContext from '../context/DetailsContext';
import RequestTypesChart from '../charts/request-type-chart.jsx';

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

  return <div><RequestTypesChart /></div>;
};

export default ServiceDetails;
