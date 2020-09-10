import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/index.scss';
import App from './App';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

const theme = createMuiTheme({
  typography: {
    // Graph font when you shrink window
    fontFamily: ['Inter', 'sans-serif'].join(','),
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('app')
);
