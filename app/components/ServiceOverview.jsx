import React, { useState, useEffect } from 'react';

const { ipcRenderer } = window.require('electron');

const ServiceOverview = () => {
  const [overviewState, setOverviewState] = useState([]);

  useEffect(() => {
    // IPC communication used to initiate query for information on microservices.
    ipcRenderer.send('overviewRequest');

    // IPC listener responsible for retrieving infomation from asynchronous main process message.
    ipcRenderer.on('overviewResponse', (event, data) => {
      // WIP: Parsing service and endpoint to create data that can be used for visualization.
      const dbData = Object.values(JSON.parse(data));
      const communications = {};
      for (let i = 0; i < dbData.length; i += 1) {
        const microservice = dbData[i].currentMicroservice;
        const endpoint = dbData[i].targetedEndpoint;
        if (communications[microservice] && !communications[microservice].includes(endpoint)) {
          communications[microservice].push(endpoint);
        } else {
          communications[microservice] = [endpoint];
        }
      }
      // Adds microservice data to state.
      setOverviewState([...Object.values(JSON.parse(data))]);
    });
  }, []);

  const stateRender = () => {
    const jsxAttributes = [];
    for (let i = 0; i < overviewState.length; i += 1) {
      const element = overviewState[i];
      jsxAttributes.push(
        <p>
          Microservice:
          {element.currentMicroservice}
           is sending a message to
          {element.targetedEndpoint}
        </p>,
      );
    }
    return jsxAttributes;
  };

  return (
    <div>
      <h1>Services Overview</h1>
      <div>
        <h3>Service List</h3>
        <p>{stateRender()}</p>
      </div>
      <div>
        <h3>Visual</h3>
      </div>
    </div>
  );
};

export default ServiceOverview;
