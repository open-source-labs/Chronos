import React, { useState, useContext } from 'react';
import SetupContext from '../context/SetupContext';
import SidebarHeader from '../components/SidebarHeader';
import Applications from '../components/Applications';
import ServicesList from '../components/ServicesList';
import AddService from '../components/AddService';
import DeleteService from '../components/DeleteService';
import '../stylesheets/SidebarContainer.css';

const SidebarContainer = ({ setDetails }) => {
  const setup = useContext(SetupContext);

  // Set view to selected index
  // Index is dependent on which microservice button is clicked
  const [index, setIndex] = useState(null);

  const handleClick = id => {
    // Toggle index to show/hide the app microservices
    setIndex(index === null ? id : null);

    // Clear main container
    setDetails(null);
  };

  const AddClick = () => {
    setup.setupRequired = setup.toggleSetup(false);
    setDetails(<AddService />);
  };

  return (
    <div className="container">
      <div className="sidebar">
        <SidebarHeader />
        <Applications handleClick={handleClick} />
        {index && <ServicesList index={index} setDetails={setDetails} />}
        <div className="btn-container">
          {/* Route to AddService component */}
          <button type="button" onClick={AddClick}>
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
