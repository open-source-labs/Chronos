import React from 'react';
import { render } from 'react-dom';
import App from './App.jsx';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

//render main application
render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root'),
);

