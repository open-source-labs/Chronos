import React, { useState, useEffect } from 'react';
import './styles.scss'; // Adjust to import from the new location

const Splash: React.FC = React.memo(() => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => setVisible(false), 2000); // Adjust time as needed
  }, []);

  return (
    <>
      {visible && (
        <div id="splash">
          <img id="splashLogo" src="assets/logo.svg" alt="Chronos" />
        </div>
      )}
    </>
  );
});

export default Splash;