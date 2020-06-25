import React from 'react';
import { Route } from 'react-router-dom';
import AddService from '../components/AddService';
import DeleteService from '../components/DeleteService';
import ServiceDetails from '../components/ServiceDetails';
import '../stylesheets/MainContainer.css';

// Details is the current microservice being displayed
// This is set in Sidebar Container and Services List Component

const MainContainer = props => (
  <>
    <Route path="/add" component={AddService} />
    <Route path="/delete" component={DeleteService} />
    <Route path="/:service" component={ServiceDetails} />
  </>
);

export default MainContainer;
