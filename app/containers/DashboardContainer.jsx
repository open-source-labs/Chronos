import React, { useState } from 'react';
import MainContainer from './MainContainer';
import SidebarContainer from './SidebarContainer';
import HealthContextProvider from '../context/HealthContext';
import CommsContextProvider from '../context/CommsContext';
import ApplicationContextProvider from '../context/ApplicationContext';
import '../stylesheets/DashboardContainer.css';

const DashboardContainer = () => {
  // useState whatever is in there is state and becomes details
  const [details, setDetails] = useState();

  return (
    <div className="dashboard">
      <ApplicationContextProvider>
        <CommsContextProvider>
          <HealthContextProvider>
            <SidebarContainer setDetails={setDetails} />
            <MainContainer details={details} />
          </HealthContextProvider>
        </CommsContextProvider>
      </ApplicationContextProvider>
    </div>
  );
};

export default DashboardContainer;
