import React, { useEffect } from 'react';


const Splash = (props) => {
  const { toggleSplash } = props;
  useEffect(() => { setTimeout(() => toggleSplash(false), 3000); });

  return (
    <div id="splash">
      <img alt="Chronos Logo" src="app/assets/icons/icon.png" id="splashLogo" />
      <span id="splashText" style={{ fontFamily: 'Baloo Bhaijaan' }}>chronos</span>
    </div>
  );
};

export default Splash;
