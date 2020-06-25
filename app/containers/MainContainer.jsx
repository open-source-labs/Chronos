import React from 'react';
import { Route } from 'react-router-dom';
import AddService from '../components/AddService';
import DeleteService from '../components/DeleteService';
import GraphsContainer from './GraphsContainer';
import '../stylesheets/MainContainer.css';

// Details is the current microservice being displayed
// This is set in Sidebar Container and Services List Component

const MainContainer = props => (
  <>
    <Route exact path="/add" component={AddService} />
    <Route exact path="/delete" component={DeleteService} />
    <Route exact path="/:service" component={GraphsContainer} />
  </>
);

export default MainContainer;
