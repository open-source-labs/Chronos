import React, { useContext, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// import GraphsContainer from './Archived';
import LandingPageContainer from './LandingPageContainer';
import TitleBarContainer from './TitleBarContainer';

// import Home from '../components/Home';
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
  const { mode, landingPage, getLandingPage } = useContext(DashboardContext);
  const currentModeCSS =
    mode === 'light mode' ? lightAndDark.lightModeMain : lightAndDark.darkModeMain;
  const checkAuth = (Component: any) => {
    if (landingPage === 'dashBoard') return <Component />;
    return <Redirect to={{ pathname: '/' }} />;
  };

  useEffect(() => {
    getLandingPage();
  }, []);

  return (
    <div className="main-container" style={currentModeCSS}>
      <div className="main-routes">
        <TitleBarContainer />
        <Switch>
          <Route exact path="/" component={LandingPageContainer} />
          <Route exact path="/about" render={() => checkAuth(About)} />
          <Route exact path="/contact" render={() => checkAuth(Contact)} />
          <Route exact path="/settings" render={() => checkAuth(Settings)} />
          <Route exact path="/applications" render={() => checkAuth(Occupied)} />
          <Route
            exact
            path="/applications/:app/:service"
            render={() => checkAuth(GraphsContainer)}
          />
          <Route path="*" render={() => <h1>Not found</h1>} />
        </Switch>
      </div>
    </div>
  );
});

export default MainContainer;
