import React, { useContext, useEffect } from 'react';
import { CommsContext } from '../context/CommsContext';
import { HealthContext } from '../context/HealthContext';
import ServiceDetails from './ServiceDetails';
import '../stylesheets/ServicesList.css';

const ServicesList = ({ index, setDetails }) => {
  const { fetchCommsData, commsData } = useContext(CommsContext);
  const { fetchHealthData } = useContext(HealthContext);

  useEffect(() => {
    fetchCommsData(index);
    fetchHealthData(index);
  }, []);

  const fetchData = microservice => {
    setDetails(<ServiceDetails service={microservice} />);
  };

  // Holds the buttons generated for unique services.
  const tabs = [];

  // Todo: Query for only the distinct microservices
  const cache = {};
  for (let i = 0; i < commsData.length; i += 1) {
    const { currentMicroservice, currentmicroservice, _id } = commsData[i];
    const service = currentMicroservice || currentmicroservice;

    if (!cache[service]) {
      cache[service] = true;
      tabs.push(
        <button className="services-btn" type="button" key={_id} onClick={() => fetchData(service)}>
          {service}
        </button>
      );
    }
  }

  // Display 'Loading' while data is fetched
  return !tabs.length ? <p>Loading</p> : tabs;
};

export default ServicesList;
