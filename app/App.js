import React, { useContext, useState } from 'react';
import Splash from './components/Splash';
import AddService from './components/AddService';
import DashboardContainer from './containers/DashboardContainer';
import SetupContext from './context/SetupContext';

const App = () => {
  const { setupRequired } = useContext(SetupContext);

  // const [firstVisit, setFirstVisit] = useState(true);

  // HARD CODED for dev purposes
  const [firstVisit, setFirstVisit] = useState(false);

  // Splash image on startup
  if (firstVisit) return <Splash setFirstVisit={setFirstVisit} />;

  return setupRequired ? <AddService /> : <DashboardContainer />;
};

export default App;
