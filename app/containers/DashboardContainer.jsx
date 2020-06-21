import React, { useState } from 'react';
import MonitoringContainer from './MonitoringContainer';
import SidebarContainer from './SidebarContainer';
import '../stylesheets/dashboard.css';

const DashboardContainer = () => {
  const [details, setDetails] = useState();

  return (
    <div className="dashboard">
      <SidebarContainer setDetails={setDetails} />
      <MonitoringContainer details={details} />
    </div>
  );
};

export default DashboardContainer;
