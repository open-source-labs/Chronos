import React from 'react';

import '../stylesheets/Features.scss';

const Features = () => (
  <div className="section-features">
    <div className="features-header">
      <h2>What is Chronos?</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum totam doloremque odit eum
        eaque a. Sunt recusandae commodi blanditiis sint dolorem at, soluta, libero unde inventore
        facilis officia explicabo quas.
      </p>
    </div>
    <div class="features-content">
      <div className="feature-1">
        <ion-icon name="videocam-outline"></ion-icon>
        <h3>Monitors Your Application</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam ad voluptatibus, a
          doloribus modi explicabo! Ipsum harum eveniet perferendis
        </p>
      </div>
      <div className="feature-2">
        <ion-icon name="notifications-outline"></ion-icon>
        <h3>Configurable Notifications</h3>
        <p>
          Ipsum dolor sit amet consectetur, adipisicing elit. Aperiam ad voluptatibus, a doloribus
          modi explicabo! Ipsum harum eveniet perferendis eos, totam excepturi quo illum repellendus
          eius nihil, ar
        </p>
      </div>
      <div className="feature-3">
        <ion-icon name="logo-github"></ion-icon>
        <h3>Open Source and Free to Use</h3>
        <p>
          abo! Ipsum harum eveniet perferendis eos, totam excepturi quo illum repellendus eius
          nihil, architecto accusantium odit?
        </p>
      </div>
    </div>
  </div>
);

export default Features;
