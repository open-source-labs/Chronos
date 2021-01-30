import React from 'react';
import { Link } from 'react-router-dom';
import C from '../assets/C.svg';

import '../stylesheets/Nav.scss';

const Nav = () => {
  return (
    <nav>
      <div className="nav-left">
        <ul>
          <li>
            <Link className="link" to="/">
              <img src={C} alt="Chronos Brand" />
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
            <a
              href="https://github.com/open-source-labs/Chronos"
              target="_blank"
            >
              <ion-icon
                className="icon icon-github"
                name="logo-octocat"
              ></ion-icon>
            </a>
          </li>
          <li>
            <a
              href="https://www.npmjs.com/package/chronos-tracker"
              target="_blank"
            >
              <ion-icon className="icon icon-npm" name="logo-npm"></ion-icon>
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/company/chronosmd"
              target="_blank"
            >
              <ion-icon
                className="icon icon-linkedin"
                name="logo-linkedin"
              ></ion-icon>
            </a>
          </li>
          <li>
            <a href="https://www.facebook.com/ChronosLA/" target="_blank">
              <ion-icon
                className="icon icon-facebook"
                name="logo-facebook"
              ></ion-icon>
            </a>
          </li>
          <li>
            <a href="https://twitter.com/teamchronosla" target="_blank">
              <ion-icon
                className="icon icon-twitter"
                name="logo-twitter"
              ></ion-icon>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
