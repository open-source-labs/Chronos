import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { ipcRenderer } from 'electron';
import Login from '../../app/components/Login';
import DashboardContextProvider from '../../app/context/DashboardContext';

jest.mock('electron', () => ({ ipcRenderer: { sendSync: jest.fn() } }));

describe('Create Admin Page', () => {
  beforeEach(() => {
    render(
      <DashboardContextProvider>
        <Login />
      </DashboardContextProvider>
    );
  });

  it('should render', () => {
    expect(screen).toBeTruthy();
  });

  it('Should contain an h1, h2, form, two buttons, and three inputs', () => {
    const element = screen.getByTestId('Login');
    expect(element.querySelectorAll('h1').length).toBe(1);
    expect(element.querySelectorAll('h2').length).toBe(1);
    expect(element.querySelectorAll('form').length).toBe(1);
    expect(element.querySelectorAll('button').length).toBe(2);
    expect(element.querySelectorAll('input').length).toBe(2);
  });

  it('Login button should submit email, username, and password to addUser', () => {
    const element = screen.getByTestId('Login');
    const inputs = element.querySelectorAll('input');
    inputs[0].value = 'me@gmail.com';
    inputs[1].value = 'me123';
    fireEvent.click(screen.getByText('Login'));
    expect(ipcRenderer.sendSync).toHaveBeenCalledWith('verifyUser', {
      email: 'me@gmail.com',
      password: 'me123',
    });
  });
});
