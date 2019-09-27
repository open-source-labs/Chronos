import React, { useState, useEffect } from 'react';

const { ipcRenderer } = window.require('electron');

const ServiceOverview = () => {
  const [overviewState, setOverviewState] = useState([]);

  useEffect(() => {
    // IPC communication used to initiate query for information on microservices.
    ipcRenderer.send('overviewRequest');
    
    // IPC listener responsible for retrieving infomation from asynchronous main process message.
    ipcRenderer.on('overviewResponse', (event, data) => {
      // Adds microservice data to state.
      const sanitizedData = [...Object.values(JSON.parse(data))];
      // Algorithm is used to convert nested object into an array;
      sanitizedData.forEach((element, index) => {
        const { currentMicroservice, targetedEndpoint } = element;
        sanitizedData[index] = [currentMicroservice, targetedEndpoint];
      });
      setOverviewState([...sanitizedData]);
    });
  }, []);

  const stateRender = () => {
    const jsxAttributes = [];
    for (let i = 0; i < overviewState.length; i += 1) {
      const element = overviewState[i];
      jsxAttributes.push(<p>Microservice: {element[0]} is sending a message to {element[1]}</p>) 
    }
    return jsxAttributes;
  };

  return (
    <div>
      <h1>Services Overview</h1>
      <p>{stateRender()}</p>
    </div>
  );
};

export default ServiceOverview;
