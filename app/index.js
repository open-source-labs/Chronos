import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import SetupContext from './context/SetupContext.js';
import './index.css';
import SignUp from './components/SignUp.jsx';
import ServiceDashboard from './components/ServicesDashboard.jsx';
// import ServiceOverview from './components/ServiceOverview.jsx';

const App = () => {
  const chronosSetup = useContext(SetupContext);
  return chronosSetup.setupRequired ? <SignUp /> : <ServiceDashboard />;
};

ReactDOM.render(<App />, document.getElementById('app'));
