import React, { useState } from 'react';
import MainContainer from './MainContainer';
import SidebarContainer from './SidebarContainer';
import DetailsContextProvider from '../context/DetailsContext';
import OverviewContextProvider from '../context/OverviewContext';
import '../stylesheets/DashboardContainer.css';

const DashboardContainer = () => {
  const [details, setDetails] = useState();

  return (
    <div className="dashboard">
      <OverviewContextProvider>
        <DetailsContextProvider>
          <SidebarContainer setDetails={setDetails} />
          <MainContainer details={details} />
        </DetailsContextProvider>
      </OverviewContextProvider>
    </div>
  );
};

export default DashboardContainer;
