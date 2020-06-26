import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AddService from '../components/AddApplication';
import DeleteService from '../components/DeleteApplication';
import GraphsContainer from './GraphsContainer';
import Home from '../components/Home';
import '../stylesheets/MainContainer.css';

// Follows the links in the Sidebar component
const MainContainer = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/add" component={AddService} />
    <Route exact path="/delete" component={DeleteService} />
    <Route exact path="/:service" component={GraphsContainer} />
  </Switch>
);

export default MainContainer;
