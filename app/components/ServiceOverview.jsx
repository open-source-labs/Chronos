const { ipcRenderer } = window.require('electron');

import React from 'react';
// const data = require('../../electron/OverviewRenderer');

class ServiceOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      db: 'postgres://jfmzzwvv:AZWRtG9zW1a9hOiInFyl49Itb1pPkqoc@salt.db.elephantsql.com:5432/jfmzzwvv',
      queryResults: null,
    };
    // this.fetch = this.fetch.bind(this);
  }

  // componentDidMount() {
  //   // const { db } = this.state;
  //   // event.preventDefault();
  //   const now = ipcRenderer.send('all', JSON.stringify('mongodb+srv://numanzor:Nu121692.@microservice-tutorial-hq75f.mongodb.net/chronos-access'));
  //   console.log(now);
  //   ipcRenderer.on('queryResponse', (data) => {
  //     console.log('WHOA!');
  //     console.log(data);
  //   });
  // }

  render() {
    // console.log(data);
    return (
      <div>
        <h1>HELLOOOOOOOO?!?</h1>
        {/* <p>this.state.queryResults</p> */}
        {/* <button onClick={reset}>Reset</button> */}
        {/* <button onClick={() => this.fetch()}>Fetch</button> */}
      </div>
    );
  }
}

// // needs to be revised.
// const ServiceOverview = () => {
//   // IPC communication used to reset settings JSON back to initial state.
//   const reset = () => {
//     event.preventDefault();
//     const state = {
//       setupRequired: true,
//       services: [],
//       database: '',
//     };
//     const resetState = ipcRenderer.sendSync('submit', JSON.stringify(state));
//   };

//   // const fetch = () => {
//   //   event.preventDefault();
//   //   console.log(this.props.db)
//   //   const data = ipcRenderer.sendSync('getAll');
//   //   console.log(data);
//   // }

//   return (
//     <div>
//       <h1>HELLOOOOOOOO?!?</h1>
//       <button onClick={reset}>Reset</button>
//       {/* <button onClick={fetch}>Fetch</button> */}
//     </div>
//   );
// };

export default ServiceOverview;
