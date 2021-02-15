import React, { createRef } from 'react';

import '../stylesheets/Features.scss';

const Features = () => {
  // const ref = createRef();
  return (
    <div /*ref={ref}*/ className="section-features">
      <div className="features-header">
        <h2>What is Chronos?</h2>
        <p>
          Chronos is a comprehensive open-source monitoring tool for your Node.js applications. Whether you have a monolithic or microservice architecture, use containers or not, and employ gRPC or REST, we've got you covered. 
        </p>
      </div>
      <div class="features-content">
        <div className="feature-1">
          <ion-icon name="videocam-outline"></ion-icon>
          <h3>Monitors Your Application</h3>
          <p>
            Install an NPM package and create a configuration file to peer into
            the inner workings of your application.
          </p>
        </div>
        <div className="feature-2">
          <ion-icon name="notifications-outline"></ion-icon>
          <h3>Configurable Notifications</h3>
          <p>
            Receive remote notifications via Slack or e-mail on critical failure
            of services.
          </p>
        </div>
        <div className="feature-3">
          <ion-icon name="logo-github"></ion-icon>
          <h3>Open Source and Free to Use</h3>
          <p>
            Chronos is Open Source and free for the community. Contributions and
            stars are welcome. Visit our <a href="https://github.com/open-source-labs/Chronos">GitHub</a>!
          </p>
        </div>
      </div>
    </div>
  );
};
export default Features;
