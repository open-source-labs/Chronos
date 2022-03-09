import React from 'react';
import { render, screen } from '@testing-library/react';
import SpeedChart from '../../app/charts/SpeedChart';
import { HealthContext } from '../../app/context/HealthContext';
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
    healthData: mockData,
    setHealthData: jest.fn(),
    fetchHealthData: jest.fn(),
    parseHealthData: jest.fn(),
    services: jest.fn(),
  };
  beforeEach(() => {
    render(
      <HealthContext.Provider value={props}>
        <SpeedChart sizing="solo" colourGenerator={jest.fn()} />
      </HealthContext.Provider>
    );
  });

  it('Should render', () => {
    expect(screen).toBeTruthy();
  });

  it('Should render graph', () => {
    expect(screen.getByTestId('Speed Chart').firstChild).toBeTruthy();
  });

  /**
   * expect 'Speed Chart' to be on screen
   */

  // it('Should have three p tags', () => {
  //   expect(element.querySelectorAll('p').length).toBe(3);
  // });

  // it('Should have three h3 tags', () => {
  //   expect(element.querySelectorAll('h3').length).toBe(3);
  // });

  // it('Should have one div', () => {
  //   expect(element.querySelectorAll('div').length).toBe(1);
  // });
});
