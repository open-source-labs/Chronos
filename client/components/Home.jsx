import React, { useRef } from 'react';
import logo from '../assets/logo.svg';
import '../stylesheets/Home.scss';

const Home = () => {
  // const myRef = useRef(null);
  // const executeScroll = () => scroll(myRef);
  // const scroll = () => {
  // if (ref && ref.current) {
  // ref.scrollIntoView();
  // }
  // };

  return (
    <div className="section-home">
      <div className="hero-container">
        <div className="hero-chronos">
          <img src={logo} alt="Chronos logo"/>
        </div>
        <div className="hero-details">
          <p>
            All-in-One Monitoring
          </p>
        </div>
      </div>
    </div>
  );
};
/*
<p>
  Introducing Chronos - an all-in-one application network and health monitoring tool,
  containerized or not! Simply install the NPM package into each of your services, provide
  a database connection string, and peer inside your application’s inner workings.
</p>
<p>
  Chronos also accesses the systems information API to monitor data pertinent to the
  health of the server on which the service lives, all beautifully displayed and
  dynamically rendered.
</p>
*/
export default Home;
