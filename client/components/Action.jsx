import React from 'react';

import '../stylesheets/Action.scss';

const Action = () => {
  return (
    <div className="section-action">
      <div className="action">
        <h2>Ready to Begin?</h2>
        <p>Download chronos as an electron app</p>
        <div className="download-btns">
          <button>macOS<br/>v4.0</button>
          <button>Linux<br/>v4.0</button>
          <button>Windows<br/>v4.0</button>
        </div>
      </div>
    </div>
  );
};

export default Action;
