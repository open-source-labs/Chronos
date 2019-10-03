import React from 'react';

const { ipcRenderer } = window.require('electron');

const OverviewContext = React.createContext((index) => {
  // IPC communication used to initiate query for information on microservices.
  ipcRenderer.send('overviewRequest', index);

  // IPC listener responsible for retrieving infomation from asynchronous main process message.
  ipcRenderer.on('overviewResponse', (event, data) => Object.values(JSON.parse(data)));

    return communications;
  });
});

export const OverviewProvider = OverviewContext.Provider;
export const OvervieConsumer = OverviewContext.Consumer;
export default OverviewContext;
