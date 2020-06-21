import React, { useState } from 'react';
import MainContainer from './MainContainer';
import SidebarContainer from './SidebarContainer';
import HealthContextProvider from '../context/HealthContext';
import CommsContextProvider from '../context/CommsContext';
import '../stylesheets/DashboardContainer.css';

const DashboardContainer = () => {
  const [details, setDetails] = useState();

  return (
    <div className="dashboard">
      <CommsContextProvider>
        <HealthContextProvider>
          <SidebarContainer setDetails={setDetails} />
          <MainContainer details={details} />
        </HealthContextProvider>
      </CommsContextProvider>
    </div>
  );
};

export default DashboardContainer;
