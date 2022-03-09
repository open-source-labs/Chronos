import React from 'react';
import { render, screen } from '@testing-library/react';
import MemoryChart from '../../app/charts/MemoryChart';
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
        <MemoryChart sizing="solo" colourGenerator={jest.fn()} />
      </HealthContext.Provider>
    );
  });

  it('Should render', () => {
    expect(screen).toBeTruthy();
  });

  it('Should render graph', () => {
    expect(screen.getByTestId('Speed Chart').firstChild).toBeTruthy();
  });

  it('Should render graph', () => {
    expect(screen.getByTestId('Speed Chart').firstChild).toBeTruthy();
  });
});