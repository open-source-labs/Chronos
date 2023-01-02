import React from 'react';
import ReactDOM from 'react-dom';

// REACT 18 Syntax below
// import { createRoot } from 'react-dom/client';

import './stylesheets/index.scss';
import { createTheme, ThemeProvider } from '@material-ui/core/';
import App from './App';
import WindowBar from './components/WindowBar';

const theme = createTheme({
  typography: {
    fontFamily: ['Roboto', 'sans-serif'].join(','),
  },
});


// React 17 Syntax below
ReactDOM.render(
  <ThemeProvider theme={theme}>
    <WindowBar />
    <App />
  </ThemeProvider>,
  document.getElementById('app')
);
