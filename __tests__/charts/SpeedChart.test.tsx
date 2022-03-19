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
  let graph;
  beforeEach(() => {
    render(
      <HealthContext.Provider value={props}>
        <SpeedChart sizing="solo" colourGenerator={jest.fn()} />
      </HealthContext.Provider>
    );
    graph = screen.getByTestId('Speed Chart').firstChild;
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
    expect(graph.calcdata[0][0].y).toBe(mockData[0].cpuspeed[0]);
    expect(graph.calcdata[0][0].i).toBe(0);
    expect(graph.calcdata[0][1].y).toBe(mockData[0].cpuspeed[1]);
    expect(graph.calcdata[0][1].i).toBe(1);
    expect(graph.calcdata[0][1].y).not.toEqual(6543213);
  });
});
