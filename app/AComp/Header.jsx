import React, { Fragment } from 'react';


const Header = (props) => {
  return (
    <>
    <div className="logoAndTitle">
      <img
        alt="Chronos Logo"
        src="app/assets/icon2Cropped.png"
        id="serviceDashLogo"
      />
      </div>
      <div className="left-top">
        <h2 className="dashboardHeader">Databases</h2>
      </div>
    </>
  );
};

export default Header;
