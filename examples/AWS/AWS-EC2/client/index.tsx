// /**
//  * ************************************
//  *
//  * @module  index.js
//  * @author  smozingo
//  * @date    11/12/17
//  * @description entry point for application.  Hangs React app off of #contents in index.html
//  *
//  * ************************************
//  */

// import React from 'react';
// import { render } from 'react-dom';
// import { Provider } from 'react-redux';
// import App from './App';
// import store from './store';
// import './styles.css';

// render(
//     <Provider store={store}>
//       <App/>
//     </Provider>,
//     document.getElementById('contents') as HTMLElement //Included Type Assertion
// );


// import React from 'react';
// import { createRoot } from 'react-dom/client';  // ✅ Use createRoot for React 18+
// import { Provider } from 'react-redux';
// import App from './App';
// import store from './store';
// import './styles.css';

// const container = document.getElementById('contents');
// if (!container) {
//   throw new Error("Root element #contents not found");
// }

// const root = createRoot(container);
// root.render(
//   <Provider store={store}>
//     <App />
//   </Provider>
// );

import React from 'react';
import { createRoot } from 'react-dom/client'; // ✅ Correct import for React 18
import { Provider } from 'react-redux';
import App from './App';
import store from './store';
import './styles.css';

// Ensure the root container exists
const container = document.getElementById('contents');
if (!container) {
  throw new Error("Root element #contents not found");
}

const root = createRoot(container);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

