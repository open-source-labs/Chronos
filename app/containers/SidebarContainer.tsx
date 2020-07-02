import React from 'react';
import { Link } from 'react-router-dom';

import HomeSharpIcon from '@material-ui/icons/HomeSharp';
import '../stylesheets/SidebarContainer.css';

const SidebarContainer: React.FC = (): JSX.Element => (
  <div className="container">
    <img alt="Chronos Logo" id="serviceDashLogo" src={'../assets/icon2Cropped.png'} />
    {/* <div className="btn-container"> */}
      <Link className="sidebar-link" to="/">
        <HomeSharpIcon />
      </Link>
    {/* </div> */}
  </div>
);
export default SidebarContainer;
