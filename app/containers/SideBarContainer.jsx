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
  const { selection, details } = props;
  // Used to toggle setup required if user wants to add a new database.
  const setup = useContext(SetupContext);

  // List of the databases saved by users to track microservices.
  const serviceList = useContext(DashboardContext);

  // Overview state used to create service buttons
  const [overviewState, setOverviewState] = useState([]);

  // Contexts have data added to them following successful IPC return. Data is later used to create charts.
  const serviceComponents = useContext(OverviewContext);

  // Click function for Services
  const ServicesClick = (e) => {
    const event = e.target.id;
    console.log(event);
    console.log(e.target);
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
    selection(<AddService />);
  };
  const DeleteClick = () => {
    selection(<DeleteService />);
  };
  const RefreshClick = () => {
    location.reload();
  };

  return (
    <div className="left">
      <div className="leftTopContainer">
        <Header />
        <ServicesList context={serviceList} Click={ServicesClick} />
        <Microservices overview={overviewState}
        details={details}
        index={0} />
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
