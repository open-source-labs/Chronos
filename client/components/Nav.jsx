import React from 'react';
import { Link } from 'react-router-dom';
import chronosbrand from '../assets/chronos-v4-pangolin.png';

import '../stylesheets/Nav.scss';

const Nav = () => {
  return (
    <nav>
      <div className="nav-left">
        <img src={chronosbrand} alt="Chronos Brand" />
        <ul>
          <li>
            <Link className="link" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="link" to="/team">
              Meet the Team
            </Link>
          </li>
          <li>
            <Link className="link" to="/contact">
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
      <div className="nav-right">
        <ul>
          <li>
            <a href="https://github.com/open-source-labs/Chronos" target="_blank">
              <ion-icon className="icon icon-github" name="logo-octocat"></ion-icon>
            </a>
          </li>
          <li>
            <a href="https://www.npmjs.com/package/chronos-tracker">
              <ion-icon className="icon icon-npm" name="logo-npm"></ion-icon>
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/company/chronosmd">
              <ion-icon className="icon icon-linkedin" name="logo-linkedin"></ion-icon>
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com/ChronosLA/">
              <ion-icon className="icon icon-facebook" name="logo-facebook"></ion-icon>
            </a>
          </li>
          <li>
            <a href="https://twitter.com/teamchronosla">
              <ion-icon className="icon icon-twitter" name="logo-twitter"></ion-icon>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
