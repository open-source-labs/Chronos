import React from 'react';
import HealthChart from '../../app/charts/HealthChart';
import { render, screen } from '@testing-library/react';

// mockData used for testing suite
const mockData = {
  ServiceName: {
    Metric: {
      time: [
        '2023-06-09T15:18:25.195Z',
        '2023-06-09T15:18:20.194Z',
        '2023-06-09T15:18:15.192Z',
        '2023-06-09T15:18:10.191Z',
        '2023-06-09T15:18:05.190Z',
      ],
      value: [1208074240, 1282670592, 1243414528, 1278115840, 117178368],
    },
  },
};

jest.mock('electron', () => ({
  ipcRenderer: {
    send: () => jest.fn(),
    on: () => mockData,
  },
}));

// test suite for HealthChart.tsx
describe('HealthChart', () => {
  const props = {
    key: 'testKey',
    dataType: 'Memory in Megabytes',
    serviceName: 'serviceName',
    chartData: mockData,
    categoryName: 'Test Name',
    sizing: 'all',
    colourGenerator: jest.fn(),
  };

  let graph;
  beforeEach(() => {
    render(<HealthChart {...props} />);

    graph = screen.getByTestId('Health Chart').firstChild;
  });

  it('Should render', () => {
    expect(screen).toBeTruthy();
  });

  it('Should render graph', () => {
    expect(graph).toBeTruthy();
  });

  it('Should not scroll', () => {
    expect(graph.scrollWidth).toBe(0);
    expect(graph.scrollHeight).toBe(0);
    expect(graph.scrollLeft).toBe(0);
    expect(graph.scrollTop).toBe(0);
  });

  it('Should have correct data on y-axis based off mock data', () => {
    expect(graph.data[0].y[0]).toBe((mockData.ServiceName.Metric.value[0] / 1000000).toFixed(2));
    expect(graph.data[0].y[1]).toBe((mockData.ServiceName.Metric.value[1] / 1000000).toFixed(2));
  });
});
