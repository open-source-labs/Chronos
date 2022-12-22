import React, { useState, useEffect } from 'react';
import '../stylesheets/Splash.scss';

// interface SplashProps {
//   setFirstVisit: React.Dispatch<React.SetStateAction<boolean>>;
// }

const Splash: React.FC = React.memo((props) => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    setTimeout(() => setVisible(false), 4000);
  }, []);

  return (
    <>
      {visible &&
          <div id="splash">
          <img id="splashLogo" src="../assets/logo.svg" alt="Chronos" />
        </div>
      }
    </>
  );
});

export default Splash;
