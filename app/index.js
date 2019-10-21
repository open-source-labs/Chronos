import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import SetupContext from './context/SetupContext.js';
import './index.css';
import AddService from './components/AddService.jsx'
import ServiceDashboard from './components/ServicesDashboard.jsx';

const App = () => {
  const chronosSetup = useContext(SetupContext);
  return chronosSetup.setupRequired ? <AddService /> : <ServiceDashboard />;
};

ReactDOM.render(<App />, document.getElementById('app'));
