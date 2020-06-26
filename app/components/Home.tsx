import React from 'react';
import '../stylesheets/Home.css';

const Home = () => {
  return (
    <div className="blank">
      <img width="300" height="auto" src={'../assets/pangolin.png'} alt="Chronos logo" />
      <h1>Welcome to Chronos!</h1>
      <p>Select your application to get started!</p>
    </div>
  );
};

export default Home;
