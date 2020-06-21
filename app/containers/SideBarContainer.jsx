import React, { useState, useContext } from 'react';
import SetupContext from '../context/SetupContext';
import SidebarHeader from '../components/SidebarHeader';
import Projects from '../components/Projects';
import ServicesList from '../components/ServicesList';
import AddService from '../components/AddService';
import DeleteService from '../components/DeleteService';
import '../stylesheets/sidebar.css';

const SidebarContainer = ({ setDetails }) => {
  const setup = useContext(SetupContext);

  // Set view to selected index
  // Index is dependent on microservice button clicked
  const [index, setIndex] = useState(null);

  const handleClick = e => {
    setIndex(e.target.id);
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
        <Projects handleClick={handleClick} />
        {index && <ServicesList index={index} setDetails={setDetails} />}
        <div className="btn-container">
          <button type="button" onClick={AddClick}>
            +
          </button>
          <button type="button" onClick={() => setDetails(<DeleteService />)}>
            -
          </button>
          <button type="button" onClick={() => location.reload()}>
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidebarContainer;
