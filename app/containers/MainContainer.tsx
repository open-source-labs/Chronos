import React from 'react';
import { Route, Switch } from 'react-router-dom';

import GraphsContainer from './GraphsContainer';
import Home from '../components/Home';
import Copyright from '../components/Copyright';

// Follows the links in the Sidebar component
const MainContainer = () => (
  <div style={{ flex: '1' }}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/:service" component={GraphsContainer} />
    </Switch>
    <Copyright />
  </div>
);

export default MainContainer;
