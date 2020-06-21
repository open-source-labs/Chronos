import React, { useState } from 'react';
import MainContainer from './MainContainer';
import SidebarContainer from './SidebarContainer';
import HealthContextProvider from '../context/HealthContext';
import CommunicationsContextProvider from '../context/CommunicationsContext';
import '../stylesheets/DashboardContainer.css';

const DashboardContainer = () => {
  const [details, setDetails] = useState();

  return (
    <div className="dashboard">
      <CommunicationsContextProvider>
        <HealthContextProvider>
          <SidebarContainer setDetails={setDetails} />
          <MainContainer details={details} />
        </HealthContextProvider>
      </CommunicationsContextProvider>
    </div>
  );
};

export default DashboardContainer;
