import React from 'react';
import GraphsContainer from '../containers/GraphsContainer';

const ServiceDetails = props => {
  // Capitalize service title
  console.log('this is the props in servicedetails:     ', props);
  return (
    <div id="serviceDetailsContainer">
      <h3 id="microserviceHealthTitle">Microservice: {props.match.params.service}</h3>
      <GraphsContainer service={props.match.params.service} />
    </div>
  );
};

export default ServiceDetails;
