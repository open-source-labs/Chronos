/**
 * ************************************
 *
 * @module  App.jsx
 * @author  smozingo
 * @date    11/12/17
 * @description
 *
 * ************************************
 */

import React, { Component } from 'react';
import MainContainer from './containers/MainContainer.jsx';

class App extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return(
      <div>
        <MainContainer />
      </div>
    )
  }
}

export default App;