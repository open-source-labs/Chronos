import React, { Fragment } from 'react';
import ServicesList from './ServicesList.jsx';

const Header = (props) => {
  const { context, Click } = props;
  return (
    <>
      <img
        alt="Chronos Logo"
        src="app/assets/icon2Cropped.png"
        id="serviceDashLogo"
      />
      <div className="left-top">
        <h2>Databases</h2>
      </div>
    </>
  );
};

export default Header;
