import React from 'react';
// import { adaptV4Theme } from '@mui/styles';
import { createTheme, adaptV4Theme } from '@mui/material/styles'
import ReactDOM from 'react-dom';

// REACT 18 Syntax below
// import { createRoot } from 'react-dom/client';

import './index.scss';
import { ThemeProvider, Theme, StyledEngineProvider } from '@mui/material';
import App from './App';
import WindowBar from './components/WindowBar/WindowBar';

// declare module '@mui/styles/defaultTheme' {
//   // eslint-disable-next-line @typescript-eslint/no-empty-interface
//   interface DefaultTheme extends Theme {}
// }


const theme = createTheme(adaptV4Theme({
  // v4 theme
  typography: {
    fontFamily: ['Roboto', 'sans-serif'].join(','),
  },
}));
// const theme = createTheme(adaptV4Theme({
//   typography: {
//     fontFamily: ['Roboto', 'sans-serif'].join(','),
//   },
// }));

// React 17 Syntax below
ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <WindowBar />
      <App />
    </ThemeProvider>
  </StyledEngineProvider>,
  document.getElementById('app')
);
