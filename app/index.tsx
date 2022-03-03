import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/index.scss';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/';
import App from './App';

const theme = createMuiTheme({
  typography: {
    // Graph font when you shrink window
    fontFamily: ['Roboto', 'sans-serif'].join(','),
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('app')
);
