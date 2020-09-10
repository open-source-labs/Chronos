import React from 'react';
import { Link } from 'react-router-dom';

import '../stylesheets/Home.scss';

const Home = () => (
  <div className="home">
    <p className="welcomeMessage">Your all-in-one application monitoring tool</p>
    <Link className="link" to="/applications">
      Get Started
    </Link>
  </div>
);

export default Home;
