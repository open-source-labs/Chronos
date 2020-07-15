import React from 'react';
import { Link } from 'react-router-dom';

import '../stylesheets/Home.scss';

const Home = () => (
  <div className="home">
    <div className="pangolin-container">
      <img src={'../assets/chronos-v4-pangolin.png'} alt="Chronos logo" />
    </div>
    <h1 id="welcome">Welcome to Chronos</h1>
    <p>A very short short description about Chronos...</p>
    <Link className="link" to="/applications">
      Get Started
    </Link>
  </div>
);

export default Home;
