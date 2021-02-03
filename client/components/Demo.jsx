import React from 'react';
// import demoVideo from '../assets/ChronosDemo.mov';

import health from '../assets/health-screenshot.png';
import apps from '../assets/apps-screenshot.png';
import code from '../assets/code-screenshot.png';
import '../stylesheets/Demo.scss';

const Demo = () => {
  return (
    <div className="section-demo">
      <div id="demo-header">
        <h2>Easy to use.</h2>
      </div>
      <div id="demo-content">
        <div className="example-1">
          <figure>
            <img src={code} alt="Config file" />
          </figure>
          <figcaption>
            <p>1. Initialize the Chronos Tracker in your server.</p>
          </figcaption>
        </div>
        <div className="example-2">
          <figure>
            <img src={apps} alt="Application cards" />
          </figure>
          <figcaption>
            <p>2. Connect your application in the desktop app.</p>
          </figcaption>
        </div>
        <div className="example-3">
          <figure>
            <img src={health} alt="Graphs" />
          </figure>
          <figcaption>
            <p>3. View server health metrics, microservice route tracing, and error logs.</p>
          </figcaption>
        </div>
        {/* <video src={demoVideo} controls={true} /> */}
      </div>
    </div>
  );
};

export default Demo;
