import React, { useContext, useState } from 'react';
import ReactDOM from 'react-dom';
import SetupContext from './context/SetupContext.js';
import './index.css';
import AddService from './components/AddService.jsx';
import ServiceDashboard from './components/ServicesDashboard.jsx';
import Splash from './components/Splash.jsx';

const App = () => {
  const [splash, toggleSplash] = useState(true);
  const chronosSetup = useContext(SetupContext);

  if (splash) return <Splash toggleSplash={toggleSplash} />;
  return chronosSetup.setupRequired ? <AddService /> : <ServiceDashboard />;
};

ReactDOM.render(<App />, document.getElementById('app'));
