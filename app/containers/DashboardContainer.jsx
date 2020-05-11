import React, { useState } from 'react';
import Monitoring from './MonitoringContainer.jsx';
import SidebarContainer from './SideBarContainer.jsx';
import '../stylesheets/dashboard.css';

const DashboardContainer = () => {

  const [detailsSelected, setDetails] = useState();

  return (
    <div className="servicesDashboardContainer">
      <SidebarContainer setDetails={setDetails} />
      <div className="databsaseList">
        <Monitoring detailsSelected={detailsSelected} />
      </div>
    </div>
  );
};

export default DashboardContainer;


