import React from 'react';
import { Link } from 'react-router-dom';

import HomeSharpIcon from '@material-ui/icons/HomeSharp';
import '../stylesheets/SidebarContainer.css';

const SidebarContainer: React.FC = (): JSX.Element => (
  <div className="container">
    <div>
      <img alt="Chronos Logo" id="serviceDashLogo" src={'../assets/icon2Cropped.png'} />
      <Link className="sidebar-link" to="/">
        <HomeSharpIcon />
      </Link>
    </div>
  </div>
);
export default SidebarContainer;
