import React from 'react';
// import demoVideo from '../assets/ChronosDemo.mov';

import health from '../assets/health-screenshot.png';
import apps from '../assets/apps-screenshot.png';
import code from '../assets/code-screenshot.png';
import '../stylesheets/Demo.scss';

const Demo = () => {
  return (
    <div className="section-demo">
      <div className="demo-header">
        <h2>3 Simple Steps:</h2>
      </div>
      <div className="demo-content">
        <div className="example-1">
          <figure>
            <img src={code} alt="Config file" />
          </figure>
          <figcaption>
            <p>
              Install and configure Chronos in your Node.js server. For more information visit our{' '}
              <a href="https://github.com/open-source-labs/Chronos">Github page</a>
            </p>
          </figcaption>
        </div>
        <div className="example-2">
          <figure>
            <img src={apps} alt="Application cards" />
          </figure>
          <figcaption>
            <p>Upload your application to the Chronos Electron app</p>
          </figcaption>
        </div>
        <div className="example-3">
          <figure>
            <img src={health} alt="Graphs" />
          </figure>
          <figcaption>
            <p>View server health, microservice route tracing, and container information</p>
          </figcaption>
        </div>
        {/* <video src={demoVideo} controls={true} /> */}
      </div>
    </div>
  );
};

export default Demo;
