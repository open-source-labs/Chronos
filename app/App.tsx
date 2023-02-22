import React, { useState } from 'react';
import Splash from './components/Splash';
import DashboardContainer from './containers/DashboardContainer';
import './stylesheets/scrollBar.scss';

const App: React.FC = React.memo(() => {
  return (
    <div>
      <Splash />
      <DashboardContainer />
    </div>

  )
});

export default App;
