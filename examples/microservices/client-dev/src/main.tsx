

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AppContextProvider } from './context/appContext';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </BrowserRouter>
);
