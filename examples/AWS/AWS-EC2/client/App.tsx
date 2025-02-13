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

interface AppProps {  
  //! Define your props type here, if any  
}  

interface AppState {  
  //! Define your state type here, if any  
}  

class App extends Component<AppProps, AppState> {  
  // constructor(props: AppProps) {  
  //   super(props);  
  //!  Initialize state here if needed  
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