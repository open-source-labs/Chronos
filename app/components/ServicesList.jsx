import React, { useContext, useEffect } from 'react';
import { CommsContext } from '../context/CommsContext';
import { HealthContext } from '../context/HealthContext';
import { ApplicationContext } from '../context/ApplicationContext';
import ServiceDetails from './ServiceDetails';
import '../stylesheets/ServicesList.css';

const ServicesList = ({ index, setDetails }) => {
  // The index prop points to one of the user's applications stored in /user/settings.json

  const { connectToDB, fetchServicesNames, servicesData, setServicesData } = useContext(
    ApplicationContext
  );
  const { setCommsData } = useContext(CommsContext);
  const { setHealthData } = useContext(HealthContext);

  // On Mount: fetch all of an application's comms and health data
  useEffect(() => {
    connectToDB(index);
    fetchServicesNames(index);

    // Clear context states when component is unmounted
    return () => {
      setCommsData([]);
      setHealthData([]);
      setServicesData([]);
    };
  }, []);

  // Change view display in the MainContainer component
  const changeView = microservice => {
    setDetails(<ServiceDetails service={microservice} />);
  };

  return !servicesData.length ? (
    // Display 'Loading' while data is fetched
    <p>Loading</p>
  ) : (
    // Display dropdown of buttons per microservice
    servicesData.map(service => (
      <button
        className="services-btn"
        type="button"
        key={service.id}
        onClick={() => changeView(service.microservice)}
      >
        {service.microservice}
      </button>
    ))
  );
};

export default ServicesList;
