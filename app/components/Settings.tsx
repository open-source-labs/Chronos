import React from 'react';

// Need to add flag to turn off the splash at start
// Need to add flag to turn off getting started page
// Need to add flag to turn on/off live data (ideally persist on restart)
// Need to add dark mode
const Settings: React.SFC = React.memo((props) => {
  return (
    <div className="home">
      <p id="settings"></p>
    </div>
  );
});

export default Settings;
