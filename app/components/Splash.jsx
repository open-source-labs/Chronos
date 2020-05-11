import React, { useEffect } from 'react';
import '../stylesheets/splash.css';

const { ipcRenderer } = window.require('electron');


const Splash = (props) => {
  const { toggleSplash } = props;
  // I know this line is dense.  Bear with me...useEffect hook that fires whenever splash
  // component is rendered, which, after 3 seconds fires toggleSplash passing in what ipcMain
  // returns when it receives the 'toggleSplash' message (which will be false boolean).  This then
  // toggles the splash state-property inside of the App component which rerenders app and no longer
  // displays the splash page.
  useEffect(() => { setTimeout(() => toggleSplash(ipcRenderer.sendSync('toggleSplash')), 3000); });

  return (
    <div id="splash">
      <img alt="Chronos Logo" src="app/assets/icons/icon.png" id="splashLogo" />
      <span id="splashText" style={{ fontFamily: 'Baloo Bhaijaan' }}>chronos</span>
    </div>
  );
};

export default Splash;
