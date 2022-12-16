import React from 'react';
import { createRoot } from 'react-dom/client';

// import './stylesheets/index.scss';
// import { createMuiTheme, ThemeProvider } from '@material-ui/core/';
// import App from './App';
// import WindowBar from './components/WindowBar';

// const theme = createMuiTheme({
//   typography: {
//     fontFamily: ['Roboto', 'sans-serif'].join(','),
//   },
// });

// ReactDOM.render(
//   <ThemeProvider theme={theme}>
//     <WindowBar />
//     <App />
//   </ThemeProvider>,
//   document.getElementById('app')
// );

const root = createRoot(document.getElementById('app')); // createRoot(container!) if you use TypeScript
root.render(<h1 style={{color: 'white'}}>Hello Gang </h1>);