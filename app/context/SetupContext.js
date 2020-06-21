import React from 'react';

const { ipcRenderer } = window.require('electron');

// Toggles setup status if user wants to add a new service.
const SetupContext = React.createContext({
  setupRequired: JSON.parse(ipcRenderer.sendSync('setup')),
  toggleSetup: setupRequired => !setupRequired,
  // splash: JSON.parse(ipcRenderer.sendSync('checkSplash')),
  // toggleSplash: () => ipcRenderer.sendSync('toggleSplash'),
});

export const SetupProvider = SetupContext.Provider;
export const SetupConsumer = SetupProvider.Consumer;
export default SetupContext;
