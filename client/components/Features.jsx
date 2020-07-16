import React from 'react';

import '../stylesheets/Features.scss';

const Features = () => (
  <div className="section-features">
    <div className="features-header">
      <h2>What is Chronos?</h2>
      <p>
        Chronos is an Open Source network and health monitoring tool for your
        system of services, containerized or not.
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
          stars are welcome. Visit our GitHub!
        </p>
      </div>
    </div>
  </div>
);

export default Features;
