import React from 'react';
import { Link } from 'react-router-dom';

import HomeSharpIcon from '@material-ui/icons/HomeSharp';
import InfoIcon from '@material-ui/icons/Info';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import SettingsIcon from '@material-ui/icons/Settings';
import '../stylesheets/SidebarContainer.css';

// Toggle logic if JS needed in the future

let mini = true;
// const toggleSidebar = () => {
//   if (mini) {
//     console.log('Opening sidebar');
//     document.getElementById('mySidebar').style.width = '250px';
//     mini = false;
//   } else {
//     console.log('Closing sidebar');
//     mini = true;
//   }
// };
const SidebarContainer: React.FC = (): JSX.Element => (
  <div
    className="sidebar-container"
    id="mySidebar"
    /*onMouseOver={toggleSidebar}
    onMouseOut={toggleSidebar}*/
  >
    <div className="sidebar">
      <img alt="Chronos Logo" id="serviceDashLogo" src={'../assets/icon2Cropped.png'} />
      <img alt="Chronos Logo Mini" id="miniLogo" src={'../assets/pangolin.png'} />
      <br />
      <br />
      <br />
      <Link className="sidebar-link" to="/" id="home">
        <HomeSharpIcon style={{ boxShadow: 'none', width: '40px', height: '40px' }} />
        &emsp;Home
      </Link>
      <Link className="sidebar-link" to="/about" id="about">
        <InfoIcon style={{ boxShadow: 'none', width: '40px', height: '40px' }} />
        &emsp;About
      </Link>
      <Link className="sidebar-link" to="/contact" id="contact">
        <ContactSupportIcon style={{ boxShadow: 'none', width: '40px', height: '40px' }} />
        &emsp;Contact
      </Link>
      <Link className="sidebar-link" to="/settings" id="settings">
        <SettingsIcon style={{ boxShadow: 'none', width: '40px', height: '40px' }} />
        &emsp;Settings
      </Link>
    </div>
  </div>
);
export default SidebarContainer;
