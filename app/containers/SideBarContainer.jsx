import React, { useState, useContext } from 'react';
import Header from '../AComp/SidebarHeader';
import SetupContext from '../context/SetupContext';
import DashboardContext from '../context/DashboardContext';
import Microservices from '../AComp/Microservices';
import ServicesList from '../AComp/ServicesList';
import AddService from '../components/AddService';
import DeleteService from '../components/DeleteService';
import '../stylesheets/sidebar.css';

const SidebarContainer = ({ setDetails }) => {
  // Used to toggle setup required if user wants to add a new database.
  const setup = useContext(SetupContext);

  // List of the databases saved by users to track microservices.
  const serviceList = useContext(DashboardContext);

  // Setting index of service selected
  const [index, setIndex] = useState();

  // Checking to see if service clicked to display Microservices
  const [clicked, setClicked] = useState(false);

  // Click function for Services
  const ServicesClick = e => {
    setClicked(!clicked);
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
        <Header />
        <Microservices context={serviceList} Click={ServicesClick} clicked={clicked} />
        {clicked && <ServicesList index={index} setDetails={setDetails} />}
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
