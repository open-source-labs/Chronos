import { Link } from 'react-router-dom';
import React from 'react';
import '../index.css';

const DropMenu = () => {
  return (
    <div className="DropMenu">
      <li id="MenuItem">
        <Link to="/">Chronos</Link>
      </li>
      <li id="MenuItem">
        <Link to="/demo">Demo</Link>
      </li>
      <li id="MenuItem">
        <Link to="/team">Team</Link>
      </li>
      <li id="MenuItem">
        <Link to="/contact">Contact</Link>
      </li>
      <li id="MenuItem">
        <a
          href="https://www.npmjs.com/package/chronos-tracker"
          target="__blank"
        >
          NPM
        </a>
      </li>
      <li id="MenuItem">
        <a href="https://github.com/oslabs-beta/Chronos" target="__blank">
          Github
        </a>
      </li>
    </div>
  );
};

export default DropMenu;
