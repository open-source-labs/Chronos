import React, { useContext } from 'react';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import { DashboardContext } from '../../app/context/DashboardContext';

const { ipcRenderer } = require('electron');

jest.mock('electron', () => ({ ipcRenderer: { sendSync: jest.fn() } }));

describe('Dashboard Context Tests', () => {
  const {
    user,
    setUser,
    landingPage,
    getLandingPage,
    updateLandingPage,
    authStatus,
    setAuth,
    applications,
    getApplications,
    addApp,
    deleteApp,
    mode,
    changeMode,
  } = useContext(DashboardContext);
});
