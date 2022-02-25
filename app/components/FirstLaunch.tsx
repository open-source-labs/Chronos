import React, { useContext } from 'react';
import { DashboardContext } from '../context/DashboardContext';

const FirstLaunch = React.memo(() => {
  const { updateLandingPage } = useContext(DashboardContext);

  return (
    <div className="home">
      <p className="welcomeMessage">Welcome to Chronos! Would you like to have authentication?</p>

      <button className="link" onClick={() => updateLandingPage('createAdmin')}>
        Enable Authentication
      </button>
      <button className="link" onClick={() => updateLandingPage('dashBoard')}>
        Disable Authentication
      </button>
    </div>
  );
});

export default FirstLaunch;
