/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Header from '../../app/components/Header';
import { DashboardContext } from '../../app/context/DashboardContext';
import { ApplicationContext } from '../../app/context/ApplicationContext';
import { HashRouter as Router } from 'react-router-dom';
import mockData from '../mock_data.json';
import '@testing-library/jest-dom';

jest.mock('electron', () => ({
  ipcRenderer: {
    send: () => jest.fn(),
    on: () => mockData,
  },
}));
describe('Speed Chart', () => {
  const props = {
    app: 'Test DB',
    service: 'Test Service',
    setLive: jest.fn(),
    live: 'false',
  };
  let element;
  beforeEach(() => {
    render(
      <Router>
        <ApplicationContext.Provider value={{ servicesData: '' }}>
          <DashboardContext.Provider value={{ mode: 'light' }}>
            <Header app={['Test DB']} service="Test Service" setLive={jest.fn()} live={false} />
          </DashboardContext.Provider>
        </ApplicationContext.Provider>
      </Router>
    );
    element = screen.getByTestId('Header');
  });

  it('Should render', () => {
    expect(screen).toBeTruthy();
  });

  it('Should have an h1, no input, and one button', () => {
    expect(element.querySelectorAll('h1').length).toBe(1);
    expect(element.querySelectorAll('input').length).toBe(0);
    expect(element.querySelectorAll('button').length).toBe(1);
  });

  it('Button should have an onClick function', () => {
    expect(typeof element.querySelector('button').onclick).toBe('function');
  });
});
