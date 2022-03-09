import React, { useState as useStateMock } from 'react';
import { render, screen } from '@testing-library/react';
import LatencyChart from '../../app/charts/LatencyChart';
import { HealthContext } from '../../app/context/HealthContext';
import mockData from '../mock_data.json';

jest.mock('electron', () => ({
  ipcRenderer: {
    send: () => jest.fn(),
    on: () => mockData,
  },
}));

describe('Latency Chart', () => {
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
        <LatencyChart sizing="all" colourGenerator={jest.fn()} />
      </HealthContext.Provider>
    );
  });

  it('Should render', () => {
    expect(screen).toBeTruthy();
  });

  it('Should render graph', () => {
    expect(screen.getByTestId('Latency Chart')).toBeTruthy();
    expect(screen).toMatchSnapshot();
  });
});
