import React from 'react';
import { render } from 'react-dom';
import Logo from './Logo.jsx'
import '../index.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

const DropMenu = () => {
    return (
        <div className="DropMenu">
            <li id="MenuItem"><Link to="/">Chronos</Link> </li>
            <li id="MenuItem"><Link to="/demo">Demo</Link></li>
            <li id="MenuItem"><a href="https://www.npmjs.com/package/chronos-microservice-debugger4">NPM</a></li>
            <li id="MenuItem"><Link to="/team">Team</Link>  </li>
            <li id="MenuItem"><a href="https://github.com/oslabs-beta/Chronos">Github</a></li>
        </div>
    )
};

export default DropMenu;