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

const Navbar = () => {
    return (
        <div id="menu">
            <ul id="menuSelections">
                <li id="MenuItem"><Link to="/">Chronos</Link></li>
                <li id="MenuItem"><Link to="/demo">Demo</Link></li>
                <li id="MenuItem" className="dropdown">
                    <button className="dropbtn">Team</button>
                    <div className="dropdown-content">
                        <a href="/team2">LA</a>
                        <a href="/team">NY</a>
                    </div>
                </li>
                <li id="MenuItem"><a href="https://www.npmjs.com/package/chronos-microservice-debugger4" target="_blank">NPM</a></li>
                <li id="MenuItem"><a href="https://github.com/oslabs-beta/Chronos" target="_blank">Github</a></li>
            </ul>
        </div>
    )
};

export default Navbar;