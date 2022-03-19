import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/index.scss';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/';
import App from './App';
import WindowBar from './components/WindowBar';

const theme = createMuiTheme({
  typography: {
    fontFamily: ['Roboto', 'sans-serif'].join(','),
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <WindowBar />
    <App />
  </ThemeProvider>,
  document.getElementById('app')
);
