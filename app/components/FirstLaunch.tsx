import React, { useContext } from 'react';
import { DashboardContext } from '../context/DashboardContext';

//  THIS FILE IS NOT DOING ANYTHING RIGHT NOW
const FirstLaunch: React.FC = React.memo(() => {
  const { updateLandingPage } = useContext(DashboardContext);

  return (
    <div className="home">
      <div className="welcome" data-testid="FirstLaunch">
        <h1 className="welcomeMessage">Welcome to Chronos!</h1>
        <h2>Would you like authentication?</h2>
        <div className="btns">
          <button className="link" onClick={() => updateLandingPage('createAdmin')}>
            Enable Sign Up
          </button>
          <button className="link" onClick={() => updateLandingPage('dashBoard')}>
            Disable Sign Up
          </button>
        </div>
      </div>
    </div>
  );
});

export default FirstLaunch;
