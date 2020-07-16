import React from 'react';

import '../stylesheets/Action.scss';

const Action = () => {
  return (
    <div className="section-action">
      <div className="action">
        <h2>Ready to Begin?</h2>
        <p>Download chronos as an electron app</p>
        <div>
          <button>Download for macOS</button>
          <button>Download for Linux</button>
          <button>Download for Windows</button>
        </div>
      </div>
    </div>
  );
};

export default Action;
