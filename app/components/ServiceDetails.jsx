import React from 'react';
import GraphsContainer from '../containers/GraphsContainer';

const ServiceDetails = ({ service }) => {
  // Capitalize service title

  return (
    <div id="serviceDetailsContainer">
      <h3 id="microserviceHealthTitle">Microservice: {service}</h3>
      <GraphsContainer service={service} />
    </div>
  );
};

export default ServiceDetails;
