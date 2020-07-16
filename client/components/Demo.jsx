import React from 'react';
// import demoVideo from '../assets/ChronosDemo.mov';

import '../stylesheets/Demo.scss';

const Demo = () => {
  return (
    <div className="section-demo">
      <div className="example-1">
        <figure>
          <img src="" alt="Config file" />
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
          <img src="" alt="Application cards" />
        </figure>
        <figcaption>
          <p>Upload your application to the Chronos Electron app</p>
        </figcaption>
      </div>
      <div className="example-3">
        <figure>
          <img src="" alt="Graphs" />
        </figure>
        <figcaption>
          <p>View server health, microservice route tracing, and container information</p>
        </figcaption>
      </div>
      {/* <video src={demoVideo} controls={true} /> */}
    </div>
  );
};

export default Demo;
