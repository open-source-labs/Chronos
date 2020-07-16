import React from 'react';
// import demoVideo from '../assets/ChronosDemo.mov';

import '../stylesheets/Demo.scss';

const Demo = () => {
  return (
    <div className="section-demo">
      <div className="example-1">
        <figure>
          <img src="" alt="Application cards" />
        </figure>
        <figcaption>
          <p>View all of your applications in one place</p>
        </figcaption>
      </div>
      <div className="example-2">
        <figure>
          <img src="" alt="Application cards" />
        </figure>
        <figcaption>
          <p>View all of your applications in one place</p>
        </figcaption>
      </div>
      <div className="example-3">
        <figure>
          <img src="" alt="Application cards" />
        </figure>
        <figcaption>
          <p>View all of your applications in one place</p>
        </figcaption>
      </div>
      {/* <div id="lightDemoWrapper">
        <div className="demoTitle1">
          <h2>Install</h2>
          <p>npm install chronos-microservice-debugger4</p>
        </div>
        <div className="demoTitle1">
          <h2>Prep</h2>
          <p>insert chronos middleware within each server</p>
        </div>
        <div className="demoTitle1">
          <h2>Connect</h2>
          <p>link your database to our middleware and the chronos application</p>
        </div>
        <div className="demoTitle1">
          <h2>Monitor</h2>
          <p>open application to view microservices data</p>
        </div>
      </div>

      <div className="space"></div>
      <div className="demoTitle2">
        <h2>Video Demonstration</h2>
        <hr id="MainHr" />
        <div className="videoDemo">
          <video src={demoVideo} controls={true} />
        </div>
      </div> */}
    </div>
  );
};

export default Demo;
