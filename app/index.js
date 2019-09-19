import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SignUp from './components/SignUp.jsx';
import ServiceOverview from './components/ServiceOverview.jsx';
const { ipcRenderer } = window.require('electron');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const state = ipcRenderer.sendSync('state');
    this.setState(JSON.parse(state));
  }

  render() {
    const { setupRequired } = this.state;
    if (setupRequired) return <SignUp />;
    return <ServiceOverview />;
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
