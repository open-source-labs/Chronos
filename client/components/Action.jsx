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
          <button>
            macOS
            <br />
            v4.0
            <br />
            <ion-icon name="download-outline"></ion-icon>
          </button>
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
