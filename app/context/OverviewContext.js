import React from 'react';

const { ipcRenderer } = window.require('electron');

const OverviewContext = React.createContext((index) => {
  // IPC communication used to initiate query for information on microservices.
  ipcRenderer.send('overviewRequest', index);

  // IPC listener responsible for retrieving infomation from asynchronous main process message.
  ipcRenderer.on('overviewResponse', (event, data) => {
    // ! WIP: Parsing service and endpoint to create data that can be used for visualization.
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
    return communications;
  });
});

export const OverviewProvider = OverviewContext.Provider;
export const OvervieConsumer = OverviewContext.Consumer;
export default OverviewContext;
