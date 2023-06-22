import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { ipcRenderer } from 'electron';
import Login from '../../app/components/Login';
import DashboardContextProvider from '../../app/context/DashboardContext';
import { HashRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';

const navigateMock = jest.fn();

jest.mock('electron', () => ({ ipcRenderer: { sendSync: jest.fn() } }));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => navigateMock,
}));

// testing suite for the CreateAdmin.tsx file
describe('Create Admin Page', () => {
  beforeEach(() => {
    render(
      <Router>
        <DashboardContextProvider>
          <Login />
        </DashboardContextProvider>
      </Router>
    );
    navigateMock.mockReset();
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

  it('Login button should submit username and password to addUser', () => {
    const usernameInput = screen.getByPlaceholderText('username');
    const passwordInput = screen.getByPlaceholderText('password');
    const loginButton = screen.getByRole('button', { name: /Login/i });

    fireEvent.change(usernameInput, { target: { value: 'St1nky' } });
    fireEvent.change(passwordInput, { target: { value: 'me123' } });

    fireEvent.click(loginButton);
    expect(ipcRenderer.sendSync).toHaveBeenCalledWith('login', {
      username: 'St1nky',
      password: 'me123',
    });
  });

  it('Should reroute user to signup', () => {
    const button = screen.getByText(/need an account/i);
    expect(button).toBeInTheDocument();
    fireEvent.click(button);

    expect(navigateMock).toHaveBeenCalledTimes(1);
  });
});
