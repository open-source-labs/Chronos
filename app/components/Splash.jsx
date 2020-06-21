import React, { useEffect } from 'react';
import '../stylesheets/splash.css';

const Splash = ({ setFirstVisit }) => {
  // Display splash for 3 seconds
  useEffect(() => {
    setTimeout(() => setFirstVisit(false), 3000);
  });

  return (
    <div id="splash">
      <img alt="Chronos Logo" src="app/assets/icons/icon.png" id="splashLogo" />
      <span id="splashText" style={{ fontFamily: 'Baloo Bhaijaan' }}>
        chronos
      </span>
    </div>
  );
};

export default Splash;
