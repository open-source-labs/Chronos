import React, {useContext, useEffect, useState} from 'react';
import '../stylesheets/Settings.scss';

// DASHBOARD CONTEXT
import { DashboardContext } from '../context/DashboardContext';

// Need to add flag to turn off the splash at start
// Need to add flag to turn off getting started page
// Need to add flag to turn on/off live data (ideally persist on restart)

//Typescript
type ClickEvent = React.MouseEvent<HTMLElement>;

const Settings: React.SFC = React.memo((props) => {
  //use context from Dash board regarding currentMode
  let { changeMode } = useContext(DashboardContext);
  const handleClick = (mode: string) => {
    changeMode(mode);
  }

  return (
    <div className="settings">
      <button className="mode" id="lightMode" onClick={() => handleClick("light mode")}>
        Light
      </button>

      <button className="mode" id="darkMode" onClick={() => handleClick("dark mode")}>
        Dark
      </button>
    </div>
  );
});

export default Settings;
