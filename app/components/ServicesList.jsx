import React, { useContext, useState, useEffect } from 'react';
import { OverviewContext } from '../context/OverviewContext';
import { DetailsContext } from '../context/DetailsContext';
import ServiceDetails from './ServiceDetails';
import '../stylesheets/ServicesList.css';

const { ipcRenderer } = window.require('electron');

const ServicesList = ({ index, setDetails }) => {
  // Overview state used to create service buttons
  const [overviewState, setOverviewState] = useState([]);

  // Contexts have data added to them following successful IPC return. Data is later used to create charts.
  const { setOverviewData } = useContext(OverviewContext);

  useEffect(() => {
    // IPC communication used to initiate query for information on microservices.
    ipcRenderer.send('overviewRequest', index);
    // IPC listener responsible for retrieving infomation from asynchronous main process message.
    ipcRenderer.on('overviewResponse', (event, data) => {
      // Adds to state and context.
      setOverviewState(Object.values(JSON.parse(data)));
      setOverviewData(JSON.parse(data));
    });
  }, []);

  const { setDetailsData } = useContext(DetailsContext);

  const fetchData = microservice => {
    // Fetch all data points
    ipcRenderer.send('detailsRequest', index);
    ipcRenderer.on('detailsResponse', (event, data) => {
      // Store all data points in DetailsContext
      setDetailsData(Object.values(JSON.parse(data)));

      // Change view in Monitoring Component
      setDetails(<ServiceDetails service={microservice} />);
    });
  };

  // Holds the buttons generated for unique services.
  const componentButtons = [];

  // Todo: Query for only the distinct microservices
  const cache = {};
  for (let i = 0; i < overviewState.length; i += 1) {
    const { currentMicroservice, currentmicroservice, _id } = overviewState[i];
    const service = currentMicroservice || currentmicroservice;

    if (!cache[service]) {
      cache[service] = true;
      componentButtons.push(
        <button className="services-btn" type="button" key={_id} onClick={() => fetchData(service)}>
          {service}
        </button>
      );
    }
  }

  // Display loading while data is fetched
  return !componentButtons.length ? <p>Loading</p> : componentButtons;
};

export default ServicesList;
