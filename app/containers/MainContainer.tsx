import React from 'react';
import { Route, Switch } from 'react-router-dom';

import GraphsContainer from './GraphsContainer';
import Home from '../components/Home';
import Copyright from '../components/Copyright';
import Occupied from '../components/Occupied';

const MainContainer = () => (
  <div style={{ flex: '1' }}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/applications" component={Occupied} />
      <Route exact path="/:service" component={GraphsContainer} />
    </Switch>
    <Copyright />
  </div>
);

export default MainContainer;
