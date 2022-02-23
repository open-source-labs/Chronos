import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { DashboardContext } from '../context/DashboardContext';

const FirstLaunch = React.memo(() => {
  const { updateLandingPage } = useContext(DashboardContext);

  return (
    <div className="home">
      <p className="welcomeMessage">Welcome to Chronos! Whould you like to have a login?</p>

      <button
        className="link"
        onClick={() => {
          updateLandingPage('signUp');
          return <Redirect to={{ pathname: '/' }} />;
        }}
      >
        Enable Sign Up
      </button>
      <button
        className="link"
        onClick={() => {
          updateLandingPage('dashBoard');
          return <Redirect to={{ pathname: '/' }} />;
        }}
      >
        Disable Sign Up
      </button>
    </div>
  );
});

export default FirstLaunch;
