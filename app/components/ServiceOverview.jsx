const { ipcRenderer } = window.require('electron');

import React from 'react';

class ServiceOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }

  componentDidMount() {
    ipcRenderer.send('queryRequest');
    ipcRenderer.on('queryResponse', (event, data) => {
      console.log('in ipcRender')
      // console.log(JSON.parse(data));
      const potato = JSON.parse(data)
      console.log('potato => ', [potato])
      
      this.setState({ data: JSON.parse(data) });
      // return potato;
    });
    // console.log('QUERY RETURNED: ', now);
    // this.setState({ queryResults: results });
    console.log('state', this.state)
  }

  render() {
    return (
      <div>
        <h1>HELLOOOOOOOO?!?</h1>
        {/* {this.state.queryResults.toString()} */}
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
