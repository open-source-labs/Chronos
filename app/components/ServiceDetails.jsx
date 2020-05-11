/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
// import Modal from './Modal.jsx';
import GraphsContainer from '../containers/GraphsContainer.jsx';

// Renders charts created with health and communication data for a selected database.
const ServiceDetails = (props) => {
  // Renders health info detail buttons
  const { service } = props;
  
  return (
    <div id="serviceDetailsContainer">
      <h3 id="microserviceHealthTitle">Microservice Health - {service}</h3>
      <GraphsContainer service={service} />
    </div>
  );
};

export default ServiceDetails;
