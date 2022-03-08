import React, { useEffect } from 'react';
import '../stylesheets/Splash.scss';

interface SplashProps {
  setFirstVisit: React.Dispatch<React.SetStateAction<boolean>>;
}

const Splash: React.SFC<SplashProps> = React.memo(({ setFirstVisit }) => {
  // Display splash for 3 seconds
  useEffect(() => {
    setTimeout(() => setFirstVisit(false), 3000);
  }, []);

  return (
    <div id="splash">
      <img id="splashLogo" src="../assets/logo.svg" alt="Chronos" />
    </div>
  );
});

export default Splash;
