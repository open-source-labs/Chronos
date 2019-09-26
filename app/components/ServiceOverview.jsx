import React from 'react';

const { ipcRenderer } = window.require('electron');


class ServiceOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // IPC communication used to initiate query for information on microservices.
    const messageToMain = ipcRenderer.send('queryRequest');
    // IPC listener responsible for retrieving infomation from asynchronous main process message.
    ipcRenderer.on('queryResponse', (event, data) => {
      // Adds microservice data to state.
      this.setState({ ...JSON.parse(data) });
    });
  }

  render () {
    return (
      <div>
        <h1>Services Overview</h1>
        <p>{JSON.stringify(this.state)}</p>
      </div>
    );
  }
}


export default ServiceOverview;
