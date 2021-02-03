import React from 'react';

import '../stylesheets/Action.scss';

const Action = () => {
  return (
    <div className="section-action">
      <div id="action-header">
        <h1>Ready to Begin?</h1>
      </div>
        {/* <p>Download Chronos as an Electron app, then follow our step-by-step instructions on <a href="https://github.com/open-source-labs/Chronos">Github.</a></p> */}
        <p>Follow our step-by-step instructions on <a href="https://github.com/open-source-labs/Chronos">Github.</a></p>
      {/* <div className="action">
        <div className="download-btns">
          <div>
            <a href="https://chronoslany.com/0af77b7f833d00399ec781432f669856.dmg">
              <button>
                MacOS
                <br />
                v6.0
                <br />
                <ion-icon name="download-outline"></ion-icon>
              </button>
            </a>
          </div>
          <div>
            <a href="#">
              <button>
                Linux
                <br />
                v6.0
                <br />
                <ion-icon name="download-outline"></ion-icon>
              </button>
            </a>
          </div>
          <div>
            <a href="#">
              <button>
                Windows
                <br />
                v6.0
                <br />
                <ion-icon name="download-outline"></ion-icon>
              </button>
            </a>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Action;
