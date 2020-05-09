import React, { useState } from 'react';
import Monitoring from './MonitoringContainer.jsx';
import SidebarContainer from './SideBarContainer.jsx';
// import ServiceOverview from '../components/ServiceOverview';

const DashboardContainer = () => {
  // Used to hold the buttons created for each database found in context.
  const [serviceSelected, setSelection] = useState();

  // Details state used to cause rerender on user selection.
  const [detailsSelected, setDetails] = useState();
  
  

  return (
    <div className="servicesDashboardContainer">
      <SidebarContainer setSelection={setSelection} setDetails={setDetails}/>
      <div className="databsaseList">
        {serviceSelected}
      </div>
    </div>
  );
};

export default DashboardContainer;

// {/* <div className="databsaseList">

// </div> */}
// {/* <Monitoring service={serviceSelected}/> */}
