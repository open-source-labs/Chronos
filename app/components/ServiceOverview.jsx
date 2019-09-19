import React from 'react';

const { ipcRenderer } = window.require('electron');

// needs to be revised.
class ServiceOverview extends React.Component {
  render() {
  // IPC communication used to reset settings JSON back to initial state. 
    const reset = () => {
      event.preventDefault();
      const state = {
        setupRequired: true,
        services: [],
        database: '',
      };
      const resetState = ipcRenderer.sendSync('submit', JSON.stringify(state));
    };
    
    return (
      <div>
        <h1>HELLOOOOOOOO?!?</h1>
        <button onClick={reset}>Reset</button>
        <button>Fetch</button>
      </div>
    );
  }
}

export default ServiceOverview;
