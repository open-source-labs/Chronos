import React, { useState as useStateMock } from 'react';
import { render, screen } from '@testing-library/react';
import LatencyChart from '../../app/charts/LatencyChart';
import { HealthContext } from '../../app/context/HealthContext';
import mockData from '../mock_data.json';
import '@testing-library/jest-dom';

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

  let graph;

  beforeEach(() => {
    render(
      <HealthContext.Provider value={props}>
        <LatencyChart sizing="solo" colourGenerator={jest.fn()} />
      </HealthContext.Provider>
    );
    graph = screen.getByTestId('Latency Chart').firstChild;
  });

  it('Should render', () => {
    expect(screen).toBeTruthy();
  });

  it('Should render graph', () => {
    expect(graph).toBeTruthy();
  });

  it('Should be alone', () => {
    expect(graph.previousSibling).toBe(null);
    expect(graph.nextSibling).toBe(null);
  });

  it('Should not scroll', () => {
    expect(graph.scrollWidth).toBe(0);
    expect(graph.scrollHeight).toBe(0);
    expect(graph.scrollLeft).toBe(0);
    expect(graph.scrollTop).toBe(0);
  });

  it('Should have width 700, height 450, and white background', () => {
    expect(graph.outerHTML.includes('width: 700px')).toBeTruthy();
    expect(graph.outerHTML.includes('height: 450px')).toBeTruthy();
    expect(graph.outerHTML.includes('style="background: white;"')).toBeTruthy();
  });

  it('Should have correct colors', () => {
    expect(graph.outerHTML.includes('{fill: #3f4f75;}')).toBeTruthy();
    expect(graph.outerHTML.includes('{fill: #80cfbe;}')).toBeTruthy();
    expect(graph.outerHTML.includes('{fill: #fff;}')).toBeTruthy();
  });

  it('Should have correct data points based off mock data', () => {
    expect(graph.data[0].y[0]).toBe(mockData[0].latency[0]);
    expect(graph.data[0].y[1]).toBe(mockData[0].latency[1]);
  });
});
