import React, { useState } from 'react';
import Monitoring from './MonitoringContainer.jsx';
import SidebarContainer from './SideBarContainer.jsx';
import '../stylesheets/dashboard.css';

const DashboardContainer = () => {
  const [detailsSelected, setDetails] = useState();

  return (
    <div className="MainDashboardContainer">
      <SidebarContainer setDetails={setDetails} />
      <Monitoring detailsSelected={detailsSelected} />
    </div>
  );
};

export default DashboardContainer;
