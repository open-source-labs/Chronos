import React, { useContext, useState } from 'react';
import ReactDOM from 'react-dom';
import SetupContext from './context/SetupContext.js';
import AddService from './components/AddService.jsx';
import Splash from './components/Splash.jsx';
import DashboardContainer from './containers/DashboardContainer.jsx';
import './stylesheets/index.css';

const App = () => {
  const chronosSetup = useContext(SetupContext);
  // useState hook to conditionally render the splash page only once per session
  const [splash, toggleSplash] = useState(chronosSetup.splash);

  if (splash) return <Splash toggleSplash={toggleSplash} />;
  return chronosSetup.setupRequired ? <AddService /> : <DashboardContainer />;
};

ReactDOM.render(<App />, document.getElementById('app'));
