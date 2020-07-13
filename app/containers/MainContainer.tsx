import React from 'react';
import { Route, Switch } from 'react-router-dom';

// import GraphsContainer from './Archived';
import Home from '../components/Home';
import Copyright from '../components/Copyright';
import Occupied from '../components/Occupied';
import GraphsContainer from './GraphsContainer';
import '../stylesheets/MainContainer.scss';

const MainContainer = () => (
  <div className="main-container">
    <div className="main-routes">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/applications" component={Occupied} />
        <Route exact path="/applications/:app/:service" component={GraphsContainer} />
        <Route path="*" render={() => <h1>Not found</h1>} />
      </Switch>
    </div>
    <div className="copyright-container">
      <Copyright />
    </div>
  </div>
);

export default MainContainer;
