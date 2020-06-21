import React, { useContext, useState } from 'react';
import Splash from './components/Splash';
import AddService from './components/AddService';
import DashboardContainer from './containers/DashboardContainer';
import SetupContext from './context/SetupContext';

const App = () => {
  const { setupRequired } = useContext(SetupContext);

  // HARD CODED for development
  const [firstVisit, setFirstVisit] = useState(false);

  // UNCOMMENT this for splash demo
  // const [firstVisit, setFirstVisit] = useState(true);

  // Splash image on startup
  if (firstVisit) return <Splash setFirstVisit={setFirstVisit} />;

  return setupRequired ? <AddService /> : <DashboardContainer />;
};

export default App;
