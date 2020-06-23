import React, { useState } from 'react';
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

  return (
    <div className="container">
      <div className="sidebar">
        <SidebarHeader />
        {/* Demo, Chronos */}
        <Applications handleClick={handleClick} />

        {/* Render the ServicesList if one of the Applications were clicked */}
        {index !== null && <ServicesList index={index} setDetails={setDetails} />}
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
