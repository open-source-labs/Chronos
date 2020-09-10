import React from 'react';
import { Link } from 'react-router-dom';

import HomeSharpIcon from '@material-ui/icons/HomeSharp';
import InfoIcon from '@material-ui/icons/Info';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import SettingsIcon from '@material-ui/icons/Settings';
import '../stylesheets/SidebarContainer.scss';

const iconStyles = {
  WebkitBoxSizing: 'border-box',
  boxShadow: 'none',
  width: '35px',
  height: '35px',
  padding: '10px',
  margin: '5px'
}

const SidebarContainer: React.FC = (): JSX.Element => (
  <div className="sidebar-container" id="mySidebar">
    <div className="sidebar">
      <div className="firstRow">
        
        <span><img alt="C" id="C" src={'../assets/C.svg'} /></span>
        
      </div>
      <hr className="line" id="firstLine"></hr>

      <div className="secondRow">
      </div>

      <hr className="line" id="secondLine"></hr>
      <div className="thirdRow">
        <Link className="sidebar-link" to="/" id="home">
          <HomeSharpIcon style={{ 
            WebkitBoxSizing: 'content-box',
            boxShadow: 'none', 
            width: '35px', 
            height: '35px', 
            }} />
          &emsp;Home
        </Link>
        <Link className="sidebar-link" to="/about" id="about">
          <InfoIcon style={{
            WebkitBoxSizing: 'content-box',
            boxShadow: 'none',
            width: '35px',
            height: '35px',
          }} />
          &emsp;About
        </Link>
        <Link className="sidebar-link" to="/contact" id="contact">
          <ContactSupportIcon style={{
            WebkitBoxSizing: 'content-box',
            boxShadow: 'none',
            width: '35px',
            height: '35px',
          }} />
          &emsp;Contact
        </Link>
        <Link className="sidebar-link" to="/settings" id="settings">
          <SettingsIcon style={{
            WebkitBoxSizing: 'content-box',
            boxShadow: 'none',
            width: '35px',
            height: '35px',
          }} />
          &emsp;Settings
        </Link>
      </div>
    </div>
  </div>
);
export default SidebarContainer;
