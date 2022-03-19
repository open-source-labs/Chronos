import React, { useState } from 'react';
import Splash from './components/Splash';
import DashboardContainer from './containers/DashboardContainer';
import './stylesheets/scrollBar.scss';

const App: React.FC = React.memo(() => {
  const [firstVisit, setFirstVisit] = useState(true);
  return firstVisit ? <Splash setFirstVisit={setFirstVisit} /> : <DashboardContainer />;
});

export default App;
