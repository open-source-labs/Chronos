import React, { useEffect } from 'react';
import '../stylesheets/Splash.css';

interface SplashProps {
  setFirstVisit: React.Dispatch<React.SetStateAction<boolean>>;
}

const Splash: React.FC<SplashProps> = ({ setFirstVisit }) => {
  // Display splash for 3 seconds
  useEffect(() => {
    setTimeout(() => setFirstVisit(false), 3000);
  }, []);

  return (
    <div id="splash">
      <img src={'../assets/logo.svg'} alt="Chronos" />
    </div>
  );
};

export default Splash;
