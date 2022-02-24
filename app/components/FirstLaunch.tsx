import React, { useContext } from 'react';
import { DashboardContext } from '../context/DashboardContext';

const FirstLaunch = React.memo(() => {
  const { updateLandingPage } = useContext(DashboardContext);

  return (
    <div className="home">
      <p className="welcomeMessage">Welcome to Chronos! Whould you like to have a login?</p>

      <button className="link" onClick={() => updateLandingPage('createAdmin')}>
        Enable Sign Up
      </button>
      <button className="link" onClick={() => updateLandingPage('dashBoard')}>
        Disable Sign Up
      </button>
    </div>
  );
});

export default FirstLaunch;
