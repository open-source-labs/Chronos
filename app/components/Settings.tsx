import React, { useContext } from 'react';
import '../stylesheets/Settings.scss';

// DASHBOARD CONTEXT
import { DashboardContext } from '../context/DashboardContext';

const Settings: React.SFC = React.memo(() => {
  const { changeMode } = useContext(DashboardContext);
  const handleClick = (mode: string) => {
    changeMode(mode);
  };

  return (
    <div className="settings">
      <button className="mode" id="lightMode" onClick={() => handleClick('light')}>
        Light
      </button>

      <button className="mode" id="darkMode" onClick={() => handleClick('dark')}>
        Dark
      </button>
    </div>
  );
});

export default Settings;
