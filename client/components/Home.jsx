import React from 'react';

import '../stylesheets/Home.scss';

const Home = () => {
  return (
    <div>
      <div id="titleChronosAndMiniTitle">
        <div id="ChronosMainText">
          <h2>CHRONOS</h2>
        </div>
        <hr id="MainHr" />
        <div id="ChronosMainTextTwo">
          <h5>THE MACRO VIEW OF YOUR APPLICATION </h5>
        </div>
        <hr id="MainHr" />
        <div id="ChronosMainTextThree">
          <p>
            Introducing Chronos - an all-in-one application network and health
            monitoring tool, containerized or not! Simply install the NPM
            package into each of your services, provide a database connection
            string, and peer inside your application’s inner workings.
          </p>
          <p>
            Chronos also accesses the systems information API to monitor data
            pertinent to the health of the server on which the service lives,
            all beautifully displayed and dynamically rendered.
          </p>
          <a
            className="github-button"
            href="https://github.com/open-source-labs/Chronos"
            data-icon="octicon-star"
            data-show-count="true"
            aria-label="Star ntkme/github-buttons on GitHub"
          >
            Star
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
