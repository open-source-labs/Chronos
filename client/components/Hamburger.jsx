import React, {useState, useEffect} from 'react';
import { render } from 'react-dom';
import Logo from './Logo.jsx'
import '../index.css';

const Hamburger = (props) => {
    
    return (
        <div className="hamburgerMenu">
            <button onClick={() => {
                onBurgerClick()
        }} id="hamburgerButton">&#9776;</button>
        </div>
    )
};

export default Hamburger;