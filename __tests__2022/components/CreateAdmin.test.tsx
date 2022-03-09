import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { ipcRenderer } from 'electron';
import CreateAdmin from '../../app/components/CreateAdmin';
import DashboardContextProvider from '../../app/context/DashboardContext';

jest.mock('electron', () => ({ ipcRenderer: { sendSync: jest.fn() } }));

describe('Create Admin Page', () => {
  beforeEach(() => {
    render(
      <DashboardContextProvider>
        <CreateAdmin />
      </DashboardContextProvider>
    );
  });

  it('should render', () => {
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
    const element = screen.getByTestId('CreateAdmin');
    const inputs = element.querySelectorAll('input');
    inputs[0].value = 'me';
    inputs[1].value = 'me@gmail.com';
    inputs[2].value = 'me123';
    fireEvent.click(screen.getByText('Create Accp[ount'));
    expect(ipcRenderer.sendSync).toHaveBeenCalledWith('addUser', {
      email: 'me@gmail.com',
      username: 'me',
      password: 'me123',
    });
  });
});
