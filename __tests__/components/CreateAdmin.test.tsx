import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { ipcRenderer } from 'electron';
import CreateAdmin from '../../app/components/CreateAdmin';
import DashboardContextProvider from '../../app/context/DashboardContext';

jest.mock('electron', () => ({ ipcRenderer: { sendSync: jest.fn() } }));

describe('Create Admin Page', () => {
  beforeEach(() => {
    console.error = jest.fn();
    render(
      <DashboardContextProvider>
        <CreateAdmin />
      </DashboardContextProvider>
    );
  });

  it('Should render', () => {
    expect(screen).toBeTruthy();
  });

  it('Should contain an h1, h2, form, button, and three inputs', () => {
    const element = screen.getByTestId('CreateAdmin');
    expect(element.querySelectorAll('h1').length).toBe(1);
    expect(element.querySelectorAll('h2').length).toBe(1);
    expect(element.querySelectorAll('form').length).toBe(1);
    expect(element.querySelectorAll('button').length).toBe(1);
    expect(element.querySelectorAll('input').length).toBe(3);
  });

  it('Create Account button should submit email, username, and password to addUser', () => {
    const username = screen.getByPlaceholderText('enter username');
    const email = screen.getByPlaceholderText('your@email.here');
    const password = screen.getByPlaceholderText('enter password');
    const createAccountButton = screen.getByRole('button', { name: /create account/i });

    fireEvent.change(email, { target: { value: 'me@gmail.com' } });
    fireEvent.change(username, { target: { value: 'me' } });
    fireEvent.change(password, { target: { value: 'me123' } });

    fireEvent.click(createAccountButton);

    expect(ipcRenderer.sendSync).toHaveBeenCalledWith('addUser', {
      email: 'me@gmail.com',
      username: 'me',
      password: 'me123',
    });
  });
});
