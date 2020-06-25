import React, { useEffect, useContext } from 'react';
import { Route } from 'react-router-dom';
import ApplicationContext from '../context/ApplicationContext';
import AddService from '../components/AddService';
import DeleteService from '../components/DeleteService';
import ServiceDetails from '../components/ServiceDetails';
import '../stylesheets/MainContainer.css';

// Details is the current microservice being displayed
// This is set in Sidebar Container and Services List Component

const MainContainer = ({ details }) => {
  // const { servicesData } = useContext(ApplicationContext);

  // const routes = [];
  // servicesData.forEach(service => {
  //   routes.push(
  //     <Route path="/:service">
  //       <ServiceDetails service={service.microservice} />
  //     </Route>
  //   );
  // });
  return <Route path="/:service" component={ServiceDetails} />;
  // {
  //   /* <>{details || null}</> */
  // }
};

export default MainContainer;
