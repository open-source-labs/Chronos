import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ApplicationContext } from '../context/ApplicationContext';
import SidebarHeader from '../components/SidebarHeader';
import Applications from '../components/Applications';
import '../stylesheets/SidebarContainer.css';

interface service {
  id: number;
  interval: number;
  microservice: string;
}

const SidebarContainer = () => {
  // Set view to selected index
  // Index is dependent on which microservice button is clicked
  const [index, setIndex] = useState<null | number>(null);

  const handleClick = (id: number) => {
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

  return (
    <div className="container">
      <div className="sidebar">
        <SidebarHeader />
        <Applications handleClick={handleClick} />
        <div className="btn-container">
          {servicesData.map((service: service) => (
            <Link className="link" to={`/${service.microservice}`} key={service.id}>
              {service.microservice}
            </Link>
          ))}
          <Link className="link" to="/add">
            +
          </Link>
          <Link className="link" to="/delete">
            -
          </Link>
          <button className="link" type="button" onClick={() => location.reload()}>
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidebarContainer;
