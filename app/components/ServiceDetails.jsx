/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
// import Modal from './Modal.jsx';
import GraphsContainer from '../containers/GraphsContainer.jsx';

// Renders charts created with health and communication data for a selected database.
const ServiceDetails = (props) => {
  // Renders health info detail buttons
  const { service } = props;
  
  //Capitalize service name
  const title = service[0].toUpperCase() + service.substring(1);

  return (
    <div id="serviceDetailsContainer">
      <h3 id="microserviceHealthTitle">{title}</h3>
      <GraphsContainer service={service} />
    </div>
  );
};

export default ServiceDetails;
