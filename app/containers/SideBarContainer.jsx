import React, { useState, useContext } from 'react';
import Header from '../AComp/SidebarHeader.jsx';
import Extras from '../AComp/Extras.jsx';
import SetupContext from '../context/SetupContext';
import DashboardContext from '../context/DashboardContext';
import Microservices from '../AComp/Microservices.jsx';
import ServicesList from '../AComp/ServicesList.jsx';
import AddService from '../components/AddService.jsx';
import DeleteService from '../components/DeleteService.jsx';
import '../stylesheets/sidebar.css';

const SidebarContainer = (props) => {
  const { setDetails } = props;

  // Used to toggle setup required if user wants to add a new database.
  const setup = useContext(SetupContext);

  // List of the databases saved by users to track microservices.
  const serviceList = useContext(DashboardContext);

  // Setting index of service selected
  const [index, setIndex] = useState();

  // Checking to see if service clicked to display Microservices
  const [isclicked, setClicked] = useState('false');

  // Helper function to check if Clicked toggles
  const clickToggle = () => {
    if (isclicked === 'true') setClicked('false');
    else setClicked('true');
  };
  // Click function for Services
  const ServicesClick = (e) => {
    clickToggle(e);
    setIndex(e.target.id);
    setDetails(null);
  };
  // Click function for AddService
  const AddClick = () => {
    setup.setupRequired = setup.toggleSetup(false);
    setDetails(<AddService />);
  };

  // Click fn for Delete Service
  const DeleteClick = () => {
    setDetails(<DeleteService />);
  };

  // Click fn for Refresh
  const RefreshClick = () => {
    location.reload();
  };

  return (
    <div className="left">
      <div className="leftTopContainer">
        <Header />
        <ServicesList
          context={serviceList}
          Click={ServicesClick}
          isclicked={isclicked}
        />
        {isclicked === 'true' ? (
          <Microservices index={index} setDetails={setDetails} />
        ) : null}
        <Extras
          AddClick={AddClick}
          DeleteClick={DeleteClick}
          RefreshClick={RefreshClick}
        />
      </div>
    </div>
  );
};

export default SidebarContainer;
