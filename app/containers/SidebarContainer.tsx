import React, {useContext, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

import HomeSharpIcon from '@material-ui/icons/HomeSharp';
import ListIcon from '@material-ui/icons/List';
import InfoIcon from '@material-ui/icons/Info';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import '../stylesheets/SidebarContainer.scss';

// import { DashboardContext } from '../context/DashboardContext';

const iconStyles = {
  WebkitBoxSizing: 'border-box',
  boxShadow: 'none',
  width: '35px',
  height: '35px',
  padding: '10px',
  margin: '5px'
}

const SidebarContainer = React.memo(function SidebarContainer(props): JSX.Element {

  return (
  <div className="sidebar-container" id="mySidebar">
    <div className="sidebar">
      <div className="firstRow">
        <span><img alt="C" id="C" src={'../assets/C.svg'} /></span>
        <span><img alt="Chronos" id="logo" src={'../assets/logo.svg'} /></span>
      </div>
      
      <hr className="line" id="firstLine"></hr>
      
      <div className="thirdRow">
        {/* <Link className="sidebar-link" to="/" id="home">
          <HomeSharpIcon style={{ 
            WebkitBoxSizing: 'content-box',
            boxShadow: 'none', 
            width: '35px', 
            height: '35px', 
            }} />
          &emsp;Home
        </Link> */}
        <Link className="sidebar-link" to="/applications" id="dash">
          <ListIcon style={{
            WebkitBoxSizing: 'content-box',
            boxShadow: 'none',
            width: '35px',
            height: '35px',
          }} />
          &emsp;Dashboard
        </Link>
        {/* <Link className="sidebar-link" to="/about" id="about">
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
        </Link> */}
        <Link className="sidebar-link" to="/settings" id="settings">
          <SettingsIcon style={{
            WebkitBoxSizing: 'content-box',
            boxShadow: 'none',
            width: '35px',
            height: '35px',
          }} />
          &emsp;Settings
        </Link>
        {/* <Link className="sidebar-link" to="/" id="logout">
            <ExitToAppIcon style={{
            WebkitBoxSizing: 'content-box',
            boxShadow: 'none',
            width: '35px',
            height: '35px',
          }} />
          &emsp;Logout
        </Link> */}
      </div>
    </div>
  </div>
)});
export default SidebarContainer;
