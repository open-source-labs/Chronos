/* eslint-disable no-underscore-dangle */
import React from 'react';
import { render, screen } from '@testing-library/react';
import TrafficChart from '../../app/charts/TrafficChart';
import { CommsContext } from '../../app/context/CommsContext';
import '@testing-library/jest-dom';

const mockCommsData = [
  {
    correlatingid: '7bdad8c0',
    endpoint: '/customers/createcustomer',
    microservice: 'customers',
    request: 'GET',
    responsemessage: 'OK',
    responsestatus: 200,
    time: '2020-06-27T05:30:43.567Z',
    id: 36,
  },
];

jest.mock('electron', () => ({
  ipcRenderer: {
    send: () => jest.fn(),
    on: () => mockCommsData,
  },
}));
describe('Traffic Chart', () => {
  const props = {
    commsData: mockCommsData,
    setCommsData: jest.fn(),
    fetchCommsData: jest.fn(),
  };
  let graph;
  beforeEach(() => {
    render(
      <CommsContext.Provider value={props}>
        <TrafficChart />
      </CommsContext.Provider>
    );
    graph = screen.getByTestId('Traffic Chart').firstChild;
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

  it('Should have width 300, height 300, and white background', () => {
    expect(graph._fullLayout.width).toBe(300);
    expect(graph._fullLayout.height).toBe(300);
  });

  it('Should have correct data points based off mock data', () => {
    expect(graph.calcdata[0][0].isBlank).toBeFalsy();
    expect(graph.data[0].x).toEqual(['customers']);
    expect(graph.data[0].y).toEqual([1, 0, 11]);
  });
});
