import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import DashboardContextProvider from '../../app/context/DashboardContext';
import FirstLaunch from '../../app/components/FirstLaunch';

const { ipcRenderer } = require('electron');

//  THE FILE THAT IS BEING TESTED IS NOT BEING USED
jest.mock('electron', () => ({ ipcRenderer: { sendSync: jest.fn() } }));

describe('FirstLaunch Page', () => {
  beforeEach(() => {
    render(
      <DashboardContextProvider>
        <FirstLaunch />
      </DashboardContextProvider>
    );
  });

  it('should render', () => {
    expect(screen).toBeTruthy();
  });

  it('Should contain an h1, h2, and two buttons', () => {
    const element = screen.getByTestId('FirstLaunch');
    expect(element.querySelectorAll('h1').length).toBe(1);
    expect(element.querySelectorAll('h2').length).toBe(1);
    expect(element.querySelectorAll('button').length).toBe(2);
  });

  it('Disable Sign Up button should update landing page with dashboard', () => {
    fireEvent.click(screen.getByText('Disable Sign Up'));
    expect(ipcRenderer.sendSync).toHaveBeenCalledWith('updateLP', 'dashBoard');
  });

  it('Enable Sign Up button should update landing page with createAdmin', () => {
    fireEvent.click(screen.getByText('Enable Sign Up'));
    expect(ipcRenderer.sendSync).toHaveBeenCalledWith('updateLP', 'createAdmin');
  });
});
