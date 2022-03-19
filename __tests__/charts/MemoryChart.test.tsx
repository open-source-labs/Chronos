/* eslint-disable no-underscore-dangle */
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
describe('Memory Chart', () => {
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
        <MemoryChart sizing="solo" colourGenerator={jest.fn()} />
      </HealthContext.Provider>
    );
    graph = screen.getByTestId('Memory Chart').firstChild;
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
    expect(graph._fullLayout.width).toBe(700);
    expect(graph._fullLayout.height).toBe(450);
  });

  it('Should have correct data points based off mock data', () => {
    expect(graph.data[0].y).toEqual(mockData[0].freememory);
    expect(graph.data[0].name).toEqual('chronos-mock - Free Memory');
    expect(graph.data[1].y).toEqual(mockData[0].usedmemory);
    expect(graph.data[1].name).toEqual('chronos-mock - Used Memory');
    expect(graph.data[2].y).toEqual(mockData[0].activememory);
    expect(graph.data[2].name).toEqual('chronos-mock - Active Memory');
  });
});
