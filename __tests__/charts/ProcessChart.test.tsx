import React from 'react';
import { render, screen } from '@testing-library/react';
import ProcessesChart from '../../app/charts/ProcessesChart';
import { HealthContext } from '../../app/context/HealthContext';
import mockData from '../mock_data.json';
import '@testing-library/jest-dom';

jest.mock('electron', () => ({
  ipcRenderer: {
    send: () => jest.fn(),
    on: () => mockData,
  },
}));
describe('Process Chart', () => {
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
        <ProcessesChart sizing="solo" colourGenerator={jest.fn()} />
      </HealthContext.Provider>
    );
    graph = screen.getByTestId('Process Chart').firstChild;
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
    expect(graph.data[0].y[0]).toBe(mockData[0].runningprocesses[0]);
    expect(graph.data[0].y[1]).toBe(mockData[0].runningprocesses[1]);
    expect(graph.data[0].name).toBe('Running Processes');
    expect(graph.data[1].y[0]).toBe(mockData[0].blockedprocesses[0]);
    expect(graph.data[1].y[1]).toBe(mockData[0].blockedprocesses[1]);
    expect(graph.data[1].name).toBe('Blocked Processes');
    expect(graph.data[2].y[0]).toBe(mockData[0].sleepingprocesses[0]);
    expect(graph.data[2].y[1]).toBe(mockData[0].sleepingprocesses[1]);
    expect(graph.data[2].name).toBe('Sleeping Processes');
  });
});
