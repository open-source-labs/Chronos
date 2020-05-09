import React, { useState, useContext } from 'react';
import Header from '../AComp/Header.jsx';
import Extras from '../AComp/Extras.jsx';
import SetupContext from '../context/SetupContext';
import DashboardContext from '../context/DashboardContext';
import Microservices from '../AComp/Microservices.jsx';
import OverviewContext from '../context/OverviewContext';
import ServicesList from '../AComp/ServicesList.jsx';

const { ipcRenderer } = window.require('electron');

const SidebarContainer = (props) => {
  const { setSelection, setDetails } = props;
  // Used to toggle setup required if user wants to add a new database.
  const setup = useContext(SetupContext);

  // List of the databases saved by users to track microservices.
  const serviceList = useContext(DashboardContext);

  // Overview state used to create service buttons
  const [overviewState, setOverviewState] = useState([]);

  // Contexts have data added to them following successful IPC return. Data is later used to create charts.
  const serviceComponents = useContext(OverviewContext);
  const [index, setIndex] = useState();
  const [isClicked, setClicked] = useState(false);

  // Helper function to check if Clicked toggles
  const clickToggle = () => {
    if (isClicked) setClicked(false);
    else setClicked(true);
  };
  // Click function for Services
  const ServicesClick = (e) => {
    clickToggle(e);
    setIndex(e.target.id);
    // const event = e.target.id;
    ipcRenderer.send('overviewRequest', e.target.id);
    // IPC listener responsible for retrieving infomation from asynchronous main process message.
    ipcRenderer.on('overviewResponse', (event, data) => {
      // Adds to state and context.
      // console.log(JSON.parse(data));
      setOverviewState(Object.values(JSON.parse(data)));
      serviceComponents.overviewData = JSON.parse(data);
    });
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
          isClicked={isClicked}
        />
        {isClicked ? (
          <Microservices
            overviewState={overviewState}
            setDetails={setDetails}
            index={index}
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
