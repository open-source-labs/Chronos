import React from 'react';
import GraphsContainer from '../containers/GraphsContainer';

const ServiceDetails = ({ service }) => {
  // Capitalize service title
  const title = service[0].toUpperCase() + service.substring(1);

  return (
    <div id="serviceDetailsContainer">
      <h3 id="microserviceHealthTitle">{title}</h3>
      <GraphsContainer service={service} />
    </div>
  );
};

export default ServiceDetails;
