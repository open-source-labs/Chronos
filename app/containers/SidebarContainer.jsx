import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ApplicationContext } from '../context/ApplicationContext';
import SidebarHeader from '../components/SidebarHeader';
import Applications from '../components/Applications';
import '../stylesheets/SidebarContainer.css';

const SidebarContainer = () => {
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

  // On Mount: fetch all of an application's comms and health data
  useEffect(() => {
    connectToDB(index);
    fetchServicesNames(index);
  }, [index]);

  const serviceList = [];

  servicesData.forEach(service => {
    serviceList.push(
      <Link className="services-btn" to={`/${service.microservice}`} key={service.id}>
        {service.microservice}
      </Link>
    );
  });

  return (
    <div className="container">
      <div className="sidebar">
        <SidebarHeader />
        {/* Demo, Chronos */}
        <Applications handleClick={handleClick} />
        {servicesData.map(service => (
          <Link className="services-btn" to={`/${service.microservice}`} key={service.id}>
            {service.microservice}
          </Link>
        ))}
        <div className="btn-container">
          <Link to="/add">+</Link>
          <Link to="/delete">-</Link>
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
