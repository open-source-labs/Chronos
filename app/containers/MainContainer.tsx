import React from 'react';
import { Route, Switch } from 'react-router-dom';

// import GraphsContainer from './Archived';
import Home from '../components/Home';
import Copyright from '../components/Copyright';
import Occupied from '../components/Occupied';
import GraphsContainer from './GraphsContainer';

const MainContainer = () => (
  <div style={{ flex: '1' }}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/applications" component={Occupied} />
      <Route exact path="/applications/:app/:service" component={GraphsContainer} />
      <Route path="*" render={() => <h1>Not found</h1>} />
    </Switch>
    <Copyright />
  </div>
);

export default MainContainer;
