import React from 'react';

import '../stylesheets/Footer.scss';
import Logo from '../assets/chronos-v4-pangolin.png';

const Footer = () => (
  <footer>
    <div className="footer-container">
      <img id="logo-img" alt="none" src={Logo} />
      <p>&nbsp;Chronos is Open Source and MIT licensed.</p>
      {/* <ul>
        <li>placeholder</li>
        <li>placeholder</li>
        <li>placeholder</li>
        <li>placeholder</li>
        <li>placeholder</li>
        <li>placeholder</li>
      </ul> */}
    </div>
  </footer>
);

export default Footer;
