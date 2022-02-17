import React, { useContext, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

// import GraphsContainer from './Archived';
import LandingPageContainer from './LandingPageContainer';
import About from '../components/About';
import Contact from '../components/Contact';
import Settings from '../components/Settings';
// import Copyright from '../components/Copyright';
import Occupied from '../components/Occupied';
import lightAndDark from '../components/Styling';
// import Occupied from '../components/Occupied_darkmode';
import GraphsContainer from './GraphsContainer';
import '../stylesheets/MainContainer.scss';
// import '../stylesheets/MainContainer_darkmode.scss';

// import ApplicationContextProvider from '../context/ApplicationContext';
import { DashboardContext } from '../context/DashboardContext';

const MainContainer = React.memo(() => {
  const { mode } = useContext(DashboardContext);
  const currentModeCSS =
    mode === 'light mode' ? lightAndDark.lightModeMain : lightAndDark.darkModeMain;

  return (
    <div className="main-container" style={currentModeCSS}>
      <div className="main-routes">
        <Switch>
          <Route exact path="/" component={LandingPageContainer} />
          <Route exact path="/about" component={About} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/settings" component={Settings} />
          <Route exact path="/applications" component={Occupied} />
          <Route exact path="/applications/:app/:service" component={GraphsContainer} />
          <Route path="*" render={() => <h1>Not found</h1>} />
        </Switch>
      </div>
    </div>
  );
});

export default MainContainer;
