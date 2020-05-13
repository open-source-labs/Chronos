import React from 'react';
import '../stylesheets/SidebarHeader.css';

const Header = (props) => {
  return (
    <>
      <img
        alt="Chronos Logo"
        src="app/assets/icon2Cropped.png"
        id="serviceDashLogo"
      />
        <h2 className="dashboardHeader">Databases</h2>
    </>
  );
};

export default Header;
