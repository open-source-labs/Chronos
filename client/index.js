import React from 'react';
import { render } from 'react-dom';
import App from './App.jsx';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

//render main application
render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

