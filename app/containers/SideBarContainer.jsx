import React, { useState, useContext } from 'react';
import Header from '../AComp/Header.jsx';
import Extras from '../AComp/Extras.jsx';
import SetupContext from '../context/SetupContext';
import DashboardContext from '../context/DashboardContext';
import Microservices from '../AComp/Microservices.jsx';
import ServicesList from '../AComp/ServicesList.jsx';
import AddService from '../components/AddService.jsx';
import DeleteService from '../components/DeleteService.jsx';
// import Monitoring from './MonitoringContainer.jsx';
import '../stylesheets/sidebar.css';

const { ipcRenderer } = window.require('electron');

const SidebarContainer = (props) => {
  // const { setSelection, setDetails } = props;
  // Used to toggle setup required if user wants to add a new database.
  const setup = useContext(SetupContext);

  const { setSelection, setDetails} = props;

  
  // List of the databases saved by users to track microservices.
  const serviceList = useContext(DashboardContext);

  

 
  const [index, setIndex] = useState();
  const [isclicked, setClicked] = useState('false');

  // Helper function to check if Clicked toggles
  const clickToggle = (e) => {
    if (isclicked === 'true') setClicked('false');
    else setClicked('true');
  };
  // Click function for Services
  const ServicesClick = (e) => {
    clickToggle(e);
    setIndex(e.target.id);

    // setSelection(<Monitoring detailsSelected={detailsSelected} />);
  };
  // Click function for AddService
  const AddClick = () => {
    setup.setupRequired = setup.toggleSetup(false);
    setSelection(<AddService />);
  };
  const DeleteClick = () => {
    setSelection(<DeleteService />);
  };
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
          <Microservices
            setSelection={setSelection}
            index={index}
            setDetails={setDetails}
          />
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
