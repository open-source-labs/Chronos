import React, { useContext } from 'react';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import DashboardContextProvider, { DashboardContext } from '../../app/context/DashboardContext';

const { ipcRenderer } = require('electron');

jest.mock('electron', () => ({ ipcRenderer: { sendSync: jest.fn() } }));

describe('FirstLaunch Page', () => {
  const TestComponent = ({ onClick }) => {
    const { updateLandingPage } = useContext(DashboardContext);
    return (
      <>
        <button className="link" id="adminBtn" onClick={onClick}>
          Admin
        </button>
        <button className="link" onClick={() => updateLandingPage('dashBoard')}>
          Dashboard
        </button>
      </>
    );
  };

  const updateLandingPage = ipcRenderer.sendSync('createAdmin');

  afterEach(cleanup);

  it('should render', () => {
    expect(TestComponent).toBeTruthy();
  });

  it('should get Admin button', () => {
    render(
      <DashboardContextProvider>
        <TestComponent onClick={updateLandingPage} />
      </DashboardContextProvider>
    );
    fireEvent.click(screen.getByText(/admin/i));
    expect(ipcRenderer.sendSync).toHaveBeenCalledWith('createAdmin');
  });
});
