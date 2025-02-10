

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import { AppContextProvider } from './context/appContext.js';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </BrowserRouter>
);
