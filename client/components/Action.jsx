import React from 'react';

import '../stylesheets/Action.scss';

const Action = () => {
  return (
    <div className="section-action">
      <div id="action-header">
        <h1>Ready to Begin?</h1>
        <p>Download Chronos as an Electron app</p>
      </div>
      <div className="action">

        <div className="download-btns">
          <a href="https://chronoslany.com/0af77b7f833d00399ec781432f669856.dmg">
            <button>
              macOS
              <br />
              v4.0
              <br />
              <ion-icon name="download-outline"></ion-icon>
            </button>
          </a>
          <button>
            Linux
            <br />
            v4.0
            <br />
            <ion-icon name="download-outline"></ion-icon>
          </button>
          <button>
            Windows
            <br />
            v4.0
            <br />
            <ion-icon name="download-outline"></ion-icon>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Action;
