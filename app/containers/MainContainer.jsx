import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AddService from '../components/AddService';
import DeleteService from '../components/DeleteService';
import GraphsContainer from './GraphsContainer';
import Home from '../components/Home';
import '../stylesheets/MainContainer.css';

// Details is the current microservice being displayed
// This is set in Sidebar Container and Services List Component

const MainContainer = props => (
  <>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/add" component={AddService} />
      <Route exact path="/delete" component={DeleteService} />
      <Route exact path="/:service" component={GraphsContainer} />
    </Switch>
  </>
);

export default MainContainer;
