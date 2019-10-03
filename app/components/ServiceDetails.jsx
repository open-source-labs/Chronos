import React, { useEffect, useState, useContext } from 'react';
import CommunicationsContext from '../context/OverviewContext';

const { ipcRenderer } = window.require('electron');

const ServiceDetails = (props) => {
  const communicationsData = useContext(CommunicationsContext);
  const [detailsState, setDetails] = useState();
  useEffect(() => {
    // IPC communication used to initiate query for information on microservices.
    ipcRenderer.send('detailsRequest', props.index);

    // IPC listener responsible for retrieving infomation from asynchronous main process message.
    ipcRenderer.on('detailsResponse', (event, data) => {
      setDetails(Object.values(JSON.parse(data)));
    });
  }, []);

  return <h1>{props.index}</h1>;
};

export default ServiceDetails;
