import React from 'react';

const { ipcRenderer } = window.require('electron');

// Obtains setup status on application start. Toggles setup status if user wants to add a new service.
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
