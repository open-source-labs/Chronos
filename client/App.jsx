import React, {useState, useEffect} from 'react';
import { render } from 'react-dom';
import Logo from './components/Logo.jsx';
import Home from './components/Home.jsx';
import Info from './components/Info.jsx';
import Team from './components/Team.jsx';
import Team2 from './components/Team2.jsx';
import Demo from './components/Demo.jsx';
import NPM from './components/NPM.jsx';
import GitHub from './components/GitHub.jsx';
import Contact from './components/Contact.jsx';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import './index.css';
import Navbar from './components/Navbar.jsx';
import Hamburger from './components/Hamburger.jsx';
import DropMenu from './components/DropMenu.jsx';


const App = () => {

    const [burgerState, setBurgerState] = useState(false);
    const [dropMenu, renderDrop] = useState(null);

    let droptoggle = null; 

    function onBurgerClick () {
        //conditional rendering for dropdown meny
        if (burgerState === false ) {
            setBurgerState(true);
            renderDrop(<DropMenu/>);
        } else {
            setBurgerState(false);
            renderDrop(null);
        };
    };


        return (
        <div>
            <div className="hamburgerMenu">
                <button onClick={() => {
                    onBurgerClick()
                }} id="hamburgerButton">&#9776;</button>
            </div>
            {dropMenu}
            <Navbar/>
            <Logo/>
            <Switch>
                <Route exact path="/" component={Home}  />
                <Route exact path="/info" component={Info}  />
                <Route exact path="/demo" component={Demo}  />
                <Route exact path="/npm" component={NPM}    />
                <Route exact path="/team" component={Team}  />
                <Route exact path="/team2" component={Team2} />
                <Route exact path="/contact" component={Contact}  />
                <Route exact path="/github" component={GitHub}  />
            </Switch>
        </div>
        )
}

export default App;