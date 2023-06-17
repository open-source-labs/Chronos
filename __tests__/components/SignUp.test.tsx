import React from 'react';
import { render, fireEvent, screen, getByPlaceholderText } from '@testing-library/react';
import { ipcRenderer } from 'electron';
import SignUp from '../../app/components/SignUp';
import DashboardContextProvider from '../../app/context/DashboardContext';
import { HashRouter as Router } from 'react-router-dom';

jest.mock('electron', () => ({ ipcRenderer: { sendSync: jest.fn() } }));

describe('Create Signup Page', () => {
  beforeEach(() => {
    render(
      <Router>
        <DashboardContextProvider>
          <SignUp />
        </DashboardContextProvider>
      </Router>
    );
  });

  it('should render', () => {
    expect(screen).toBeTruthy();
  });

  it('Should contain an h1, h2, form, two buttons, and three inputs', () => {
    const element = screen.getByTestId('SignUp');
    expect(element.querySelectorAll('h1').length).toBe(1);
    expect(element.querySelectorAll('h2').length).toBe(1);
    expect(element.querySelectorAll('form').length).toBe(1);
    expect(element.querySelectorAll('button').length).toBe(2);
    expect(element.querySelectorAll('input').length).toBe(4);
  });

  it('Sign up button should submit email, username, and password to addUser', async () => {
    screen.debug();

    const username = screen.getByPlaceholderText('enter username');
    const email = screen.getByPlaceholderText('your@email.here');
    const password = screen.getByPlaceholderText('enter password');
    const signupButton = screen.getByRole('signup');

    fireEvent.change(email, { target: { value: 'me@gmail.com' } });
    fireEvent.change(username, { target: { value: 'me' } });
    fireEvent.change(password, { target: { value: 'me123' } });
    fireEvent.click(signupButton);
  });
});
