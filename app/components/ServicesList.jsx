import React, { useContext, useEffect } from 'react';
import { CommsContext } from '../context/CommsContext';
import { HealthContext } from '../context/HealthContext';
import ServiceDetails from './ServiceDetails';
import '../stylesheets/ServicesList.css';
import { ApplicationContext } from '../context/ApplicationContext';

const ServicesList = ({ index, setDetails }) => {
  // The index prop points to one of the user's applications stored in /user/settings.json

  // Establish access to Health and Comms context
  const { connectToDB, fetchServicesNames, servicesData, setServicesData } = useContext(ApplicationContext);
  const { fetchCommsData, commsData, setCommsData } = useContext(CommsContext);
  const { fetchHealthData, setHealthData } = useContext(HealthContext);
console.log('in services list, services data =>', servicesData)
  // On Mount: fetch all of an application's comms and health data
  // methods come from application context
  useEffect(() => {
    connectToDB(index);
    // Greg Michael - fetch service names
    fetchServicesNames(index);

    // Clear context states when component is unmounted
    return () => {
      setCommsData([]);
      setHealthData([]);
      // Greg Michael
      setServicesData([]);
    };
  }, []);

  // Change view display in the MainContainer component
  const changeView = microservice => {
    setDetails(<ServiceDetails service={microservice} />);
  };

  // Cache stores every microservice of the application
  // const cache = {};

  // Holds all of the buttons to be rendered
  const tabs = [];

  // Iterates through all datapoints (around 500) to find all distinct microservices

  // GET RID OF FOR LOOP!!!!
  // for (let i = 0; i < commsData.length; i += 1) {
  //   // Currently camelCase is for MongoDB, lowercase is for SQL
  //   // Todo: match the columns/keys in both MongoDB and SQL
  //   const { currentMicroservice, currentmicroservice, _id } = commsData[i];
  //   const service = currentMicroservice || currentmicroservice;

  //   if (!cache[service]) {
  //     cache[service] = true;

  //     // Make a button for each newly found microservice
  //     tabs.push(
  //       <button
  //         className="services-btn"
  //         type="button"
  //         key={_id}
  //         onClick={() => changeView(service)}
  //       >
  //         {service}
  //       </button>
  //     );
  //   }
  // }

  // Michael, Greg --> Re-write for loop logic:
  servicesData.forEach(service => {
    tabs.push(
      <button
        className="services-btn"
        type="button"
        key={service.id}
        onClick={() => changeView(service.microservice)}
      >
        {service.microservice}
      </button>
    );
  });

  // Display 'Loading' while data is fetched
  return !tabs.length ? <p>Loading</p> : tabs;
};

export default ServicesList;
