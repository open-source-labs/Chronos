import React, { useState } from 'react';
import Splash from './components/Splash';
import DashboardContainer from './containers/DashboardContainer';

const App: React.FC = () => {
  // HARD CODED for development
  const [firstVisit, setFirstVisit] = useState(false);

  // UNCOMMENT this for splash demo
  // const [firstVisit, setFirstVisit] = useState<boolean>(true);

  // Splash image on startup
  return firstVisit ? <Splash setFirstVisit={setFirstVisit} /> : <DashboardContainer />;
};

export default App;
