import React from 'react';

const { ipcRenderer } = window.require('electron');

const SetupContext = React.createContext({
  setupRequired: JSON.parse(ipcRenderer.sendSync('setup')),
  toggleSetup: (currentSetup) => {
    if (currentSetup) return false;
    return true;
  },
});

export const SetupProvider = SetupContext.Provider;
export const SetupConsumer = SetupProvider.Consumer;
export default SetupContext;
