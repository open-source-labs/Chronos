import React from 'react';
import { Link } from 'react-router-dom';

import '../stylesheets/Home.scss';

const Home = () => (
  <div className="home">
    <div className="pangolin-container">
      <img src={'../assets/icon.png'} alt="Chronos logo" />
    </div>
    <h1 id="welcome">Welcome to Chronos</h1>
    <p>Your all-in-one application monitoring tool.</p>
    <Link className="link" to="/applications">
      Get Started
    </Link>
  </div>
);

export default Home;
