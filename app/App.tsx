import React, { useState } from 'react';
import Splash from './components/Splash';
import DashboardContainer from './containers/DashboardContainer';
import './stylesheets/scrollBar.scss';


// this is the fitness gram pacer test
// React memo helps with rendering optimization. The components within React memo will only be rerendered if prompt has changed
const App: React.FC = React.memo(() => {
  return (
    <div>
      <Splash />
      <DashboardContainer />
    </div>
  );
});

export default App;
