import React from 'react';
import { Link } from 'react-router-dom';
import chronosbrand from '../assets/chronos-v4-pangolin.png';

import '../stylesheets/Nav.scss';

const Nav = () => {
  return (
    <div className="nav-container">
      <div className="nav-left">
        <ul>
          <li>
            <img src={chronosbrand} alt="Chronos Brand" />
          </li>
          <li>Download</li>
          <li>
            <Link className="link" to="/team">Meet the Team</Link>
          </li>
          <li>
            <Link className="link" to="/contact">Contact Us</Link>
          </li>
        </ul>
      </div>
      <div className="nav-right">
        <ul>
          <li>
            <a href="https://github.com/open-source-labs/Chronos" target="_blank">
              Github
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/company/chronosmd">LinkedIn</a>
          </li>
          <li>
            <a href="https://www.npmjs.com/package/chronos-tracker">NPM</a>
          </li>
          <li>
            <a href="https://www.facebook.com/ChronosLA/">FaceBook</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
