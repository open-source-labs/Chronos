import React from 'react';
import { Link } from 'react-router-dom';

// import HomeSharpIcon from '@material-ui/icons/HomeSharp';
import '../stylesheets/SidebarContainer.css';

const SidebarContainer: React.FC = (): JSX.Element => (
  <div className="sidebar-container">
    <div className="sidebar">
      <img alt="Chronos Logo" id="serviceDashLogo" src={'../assets/icon2Cropped.png'} />
      <Link className="sidebar-link" to="/">
        {/* <HomeSharpIcon style={{ boxShadow: 'none', width: '40px', height: '40px' }}/> */}
        Home
      </Link>
      <Link className="sidebar-link" to="/">
        About
      </Link>
      <Link className="sidebar-link" to="/">
        Contact
      </Link>
      <Link className="sidebar-link" to="/">
        Settings
      </Link>
    </div>
  </div>
);
export default SidebarContainer;
