import React from 'react';
import Close from '@material-ui/icons/Close';
import Minimize from '@material-ui/icons/Minimize';
import Maximize from '@material-ui/icons/CheckBoxOutlineBlankSharp';

import '../stylesheets/TitleBarContainer.scss';

export default function Titlebarcontainer(props) {
  return (
    <div id="titleBar">
      <Minimize />
      <Maximize />
      <Close className="close" />
    </div>
  );
}
