import React from 'react';
import ReactDOM from 'react-dom';

// REACT 18 Syntax below
// import { createRoot } from 'react-dom/client';

import './stylesheets/index.scss';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/';
import App from './App';
import WindowBar from './components/WindowBar';

const theme = createMuiTheme({
  typography: {
    fontFamily: ['Roboto', 'sans-serif'].join(','),
  },
});


// React 17 Syntax below
// ReactDOM.render(
//   <ThemeProvider theme={theme}>
//     <WindowBar />
//     <App />
//   </ThemeProvider>,
//   document.getElementById('app')
// );

ReactDOM.render(
    <h1 style={{color: 'red'}}>Hi Gang</h1>,
    document.getElementById('app')
)


// React 18 Syntax below
// const root = createRoot(document.getElementById('app')); // createRoot(container!) if you use TypeScript
// root.render(<h1 style={{color: 'red'}}>Hello Gang </h1>);