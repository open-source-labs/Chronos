/**
 * ************************************
 *
 * @module  index.js
 * @author  smozingo
 * @date    11/12/17
 * @description entry point for application.  Hangs React app off of #contents in index.html
 *
 * ************************************
 */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './App.jsx';
import store from './store';
import './styles.css';

render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.getElementById('contents')
);


