import React from 'react';

import '../stylesheets/Action.scss';

const Action = () => {
  return (
    <div className="section-action">
      <div id="action-header">
        <h1>Ready to Begin?</h1>
      </div>
      <div className="action">
        <div className="download-btns">
          <img src="https://img.icons8.com/metro/52/000000/mac-os.png"/>
          <img src="https://img.icons8.com/metro/52/000000/linux.png"/>
          <img src="https://img.icons8.com/material-sharp/48/000000/windows-client.png"/>
        </div>
        <p>Compatible with Mac, Linux, and Windows.</p>
        <p>Follow our step-by-step installation on <a href="https://github.com/open-source-labs/Chronos">Github.</a></p>
      </div>
        {/* <p>Download Chronos as an Electron app, then follow our step-by-step instructions on <a href="https://github.com/open-source-labs/Chronos">Github.</a></p> */}
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
