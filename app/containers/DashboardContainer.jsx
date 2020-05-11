import React, { useState } from 'react';
import Monitoring from './MonitoringContainer.jsx';
import SidebarContainer from './SideBarContainer.jsx';
// import ServiceOverview from '../components/ServiceOverview';
import '../stylesheets/dashboard.css';

const DashboardContainer = () => {
  // Used to hold the buttons created for each database found in context.
  const [serviceSelected, setSelection] = useState();
  const [detailsSelected, setDetails] = useState();
  return (
    <div className="servicesDashboardContainer">
      <SidebarContainer setSelection={setSelection} setDetails={setDetails} />
      <div className="databsaseList">
        {serviceSelected || <Monitoring detailsSelected={detailsSelected} />}
      </div>
    </div>
  );
};

export default DashboardContainer;

// {/* <div className="databsaseList">

// </div> */}
// {/* <Monitoring service={serviceSelected}/> */}
