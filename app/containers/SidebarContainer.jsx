import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { CommsContext } from '../context/CommsContext';
import { HealthContext } from '../context/HealthContext';
import { ApplicationContext } from '../context/ApplicationContext';
// import ServiceDetails from '../components/ServiceDetails';
import SidebarHeader from '../components/SidebarHeader';
import Applications from '../components/Applications';
import ServicesList from '../components/ServicesList';
import AddService from '../components/AddService';
import DeleteService from '../components/DeleteService';
import '../stylesheets/SidebarContainer.css';

const SidebarContainer = ({ setDetails }) => {
  // Set view to selected index
  // Index is dependent on which microservice button is clicked
  const [index, setIndex] = useState(null);

  const handleClick = id => {
    // Toggle the sidebar buttons to reveal or hide their microservices
    if (index === null) {
      setIndex(id);
    } else {
      setIndex(index === id ? null : id);
    }
  };

  const { connectToDB, fetchServicesNames, servicesData } = useContext(ApplicationContext);
  // const { setCommsData } = useContext(CommsContext);
  // const { setHealthData } = useContext(HealthContext);

  // On Mount: fetch all of an application's comms and health data
  useEffect(() => {
    connectToDB(index);
    fetchServicesNames(index);

    // Clear context states when component is unmounted
    //  return () => {
    //    setCommsData([]);
    //    setHealthData([]);
    //    setServicesData([]);
    //  };
  }, [index]);

  const serviceList = [];

  servicesData.forEach(service => {
    serviceList.push(
      <Link className="services-btn" to={`/${service.microservice}`} key={service.id}>
        {service.microservice}
      </Link>
    );
  });
  // console;
  //  for (let i = 0; i < commsData.length; i += 1) {
  //    // Currently camelCase is for MongoDB, lowercase is for SQL
  //    // Todo: match the columns/keys in both MongoDB and SQL
  //    const { currentMicroservice, currentmicroservice, _id } = commsData[i];
  //    const service = currentMicroservice || currentmicroservice;

  //    if (!cache[service]) {
  //      cache[service] = true;

  //      // Make a button for each newly found microservice
  //      serviceList.push(
  //        <button className="services-btn" type="button" key={_id}>
  //          <Link key={_id} to={`/${_id}`}>
  //            {service}
  //          </Link>
  //        </button>
  //      );
  //      routes.push(
  //        <Route key={_id} path={`/:service`}>
  //          <ServiceDetails service={service} />
  //        </Route>
  //      );
  //    }
  //  }
  //  console.log('hey this is the cache:    ', routes);
  //  console.log('hey this is the cache:    ', serviceList);

  return (
    <div className="container">
      <div className="sidebar">
        <SidebarHeader />
        {/* Demo, Chronos */}
        <Applications handleClick={handleClick} />

        {/* Render the ServicesList if one of the Applications were clicked */}
        {/* {index !== null && <ServicesList index={index} setDetails={setDetails} />} */}
        {serviceList}
        <div className="btn-container">
          {/* Route to AddService component */}
          <button type="button" onClick={() => setDetails(<AddService />)}>
            +
          </button>

          {/* Route to DeleteService component */}
          <button type="button" onClick={() => setDetails(<DeleteService />)}>
            -
          </button>

          {/* Refresh page */}
          <button type="button" onClick={() => location.reload()}>
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidebarContainer;
