import React, { useState, useEffect } from 'react';
import '../stylesheets/Splash.scss';

const Splash: React.FC = React.memo(props => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => setVisible(false), 1000);
  }, []);

  return (
    <>
      {visible && (
        <div id="splash">
          <img id="splashLogo" src="../assets/logo.svg" alt="Chronos" />
        </div>
      )}
    </>
  );
});

export default Splash;
