import React from 'react';
import icon from '../assets/pangolin.png';
import '../stylesheets/Home.css';

const Home = props => {
  return (
    <div className="blank">
      <img width="300" height="auto" src={icon} alt="Chronos logo" />
      <h1>Welcome to Chronos!</h1>
      <p>Select your application to get started!</p>
    </div>
  );
};

export default Home;
