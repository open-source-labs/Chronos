import React from 'react';
import Close from '@material-ui/icons/Close';
import Minimize from '@material-ui/icons/Minimize';
import Maximize from '@material-ui/icons/CheckBoxOutlineBlankSharp';

// import { remote } from 'electron';
// const remote = require('electron');

import '../stylesheets/TitleBarContainer.scss';

export default function TitleBarContainer() {
  return (
    <div id="titleBar">
      <button id="max-btn">test</button>
      {/* <Minimize className="button" id="min-btn" /> */}
      <Maximize className="button" id="max-btn" />
      <Close className="button" id="close-btn" />
    </div>
  );
}
