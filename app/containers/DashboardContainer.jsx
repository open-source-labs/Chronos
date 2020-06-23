import React, { useState } from 'react';
import MainContainer from './MainContainer';
import SidebarContainer from './SidebarContainer';
import HealthContextProvider from '../context/HealthContext';
import CommunicationsContextProvider from '../context/CommunicationsContext';
import '../stylesheets/DashboardContainer.css';

const DashboardContainer = () => {
  // useState whatever is in there is state and becomes details
  const [details, setDetails] = useState();

  return (
    <div className="dashboard">
      <CommunicationsContextProvider>
        <HealthContextProvider>
          {/* main functionality */}
          <SidebarContainer setDetails={setDetails} />
          {/* graphs */}
          <MainContainer details={details} />
        </HealthContextProvider>
      </CommunicationsContextProvider>
    </div>
  );
};

export default DashboardContainer;
