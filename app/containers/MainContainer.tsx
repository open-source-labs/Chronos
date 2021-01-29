import React, {useContext} from 'react';
import { Route, Switch } from 'react-router-dom';

// import GraphsContainer from './Archived';
import Home from '../components/Home';
import About from '../components/About';
import Contact from '../components/Contact';
import Settings from '../components/Settings';
import Copyright from '../components/Copyright';
import Occupied from '../components/Occupied';
// import Occupied from '../components/Occupied_darkmode';
import GraphsContainer from './GraphsContainer';
import '../stylesheets/MainContainer.scss';
// import '../stylesheets/MainContainer_darkmode.scss';

import ApplicationContextProvider from '../context/ApplicationContext';
import { DashboardContext } from '../context/DashboardContext';
//var currOccu
  //if mode = dark set currOccu to dark mode 
const MainContainer = React.memo(() => {
  const { mode, changeMode } = useContext(DashboardContext);

  const lightMode = {
    backgroundColor: "#eeeeee",
    flex: "1",
    minHeight: "100vh",
    flexDirection: "column" as "column",
    paddingLeft: "140px",
  }
  const darkMode = {
    backgroundImage: "url('../assets/mountain_longer.png')",
    backgroundSize: 'contain',
    backgroundColor: "#eeeeee",
    flex: "1",
    minHeight: "100vh",
    flexDirection: "column" as "column",
    paddingLeft: "140px",
  }
   let currentMode = (mode === 'light mode')? lightMode : darkMode;
  return (
  <div className="main-container" style ={currentMode}>
    <div className="main-routes">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/applications" component={Occupied} />
        <Route exact path="/applications/:app/:service" component={GraphsContainer} />
        <Route path="*" render={() => <h1>Not found</h1>} />
      </Switch>
    </div>
    <div className="copyright-container">
      <Copyright />
    </div>
  </div>
)});

export default MainContainer;
