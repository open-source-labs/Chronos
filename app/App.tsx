import React, { useState } from 'react';
import Splash from './components/Splash';
import DashboardContainer from './containers/DashboardContainer';
import './stylesheets/scrollBar.scss';

const App: React.FC = React.memo(() => {
  // Disable splash for development
  // const [firstVisit, setFirstVisit] = useState(false);

  // UNCOMMENT this for splash demo
  const [firstVisit, setFirstVisit] = useState(true);

  // Splash image on startup
  return firstVisit ? <Splash setFirstVisit={setFirstVisit} /> : <DashboardContainer />;
});

export default App;
