import React from 'react';

const { ipcRenderer } = window.require('electron');

// Obtains setup and splash status on application start. Toggles setup status if user wants to add a new service.
const SetupContext = React.createContext({
  setupRequired: JSON.parse(ipcRenderer.sendSync('setup')),
  splash: JSON.parse(ipcRenderer.sendSync('checkSplash')),
  toggleSetup: (currentSetup) => {
    if (currentSetup) return false;
    return true;
  },
});

export const SetupProvider = SetupContext.Provider;
export const SetupConsumer = SetupProvider.Consumer;
export default SetupContext;
