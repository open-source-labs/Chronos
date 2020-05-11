import React, { Fragment } from 'react';


const Header = (props) => {
  return (
    <>
    <div className="logoAndTitle">
      <img
        alt="Chronos Logo"
        src="app/assets/logo2.png"
        id="serviceDashLogo"
      />
      <h1>Chronos</h1>
      </div>
      <div className="left-top">
        <h2 className="dashboardHeader">Databases</h2>
      </div>
    </>
  );
};

export default Header;
