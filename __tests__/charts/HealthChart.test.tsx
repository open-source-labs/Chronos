import React from 'react';
import HealthChart from '../../app/charts/HealthChart';
import { render, screen } from '@testing-library/react';

// import mockData from '../mock_data.json';

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

jest.mock('react-plotly.js', () => (props) {
  const div = document.createElement('div');
  
})

describe('HealthChart', () => {
  const props = {
    key: 'testKey',
    dataType: 'Memory in Megabytes',
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

  it('Should have width 800, height 600, and white background', () => {
    // console.log('graph', graph.firstChild);
    console.log('graph.outerHTML: ', graph.outerHTML);

    expect(graph.outerHTML.includes('width: 800px')).toBeTruthy();
    expect(graph.outerHTML.includes('height: 600px')).toBeTruthy();
    expect(graph.outerHTML.includes('style="background: white;"')).toBeTruthy();
  });

  it('Should have correct colors', () => {
    expect(graph.outerHTML.includes('{fill: #fc4039;}')).toBeTruthy();
  });

  it('Should have correct data on y-axis based off mock data', () => {
    console.log('GRAPH DATA: ', graph.data);
    expect(graph.data[0].y[0]).toBe((mockData.ServiceName.Metric.value[0] / 1000000).toFixed(2));
    expect(graph.data[0].y[1]).toBe((mockData.ServiceName.Metric.value[1] / 1000000).toFixed(2));
  });

  it('Should have correct time on x-axis based off mock data', () => {
    const expectedOutput = ['15:18:25', '15:18:20', '15:18:15', '15:18:10', '15:18:05'];

    expect(graph.data[0].x[0]).toEqual(expectedOutput[0]);
    expect(graph.data[0].x[1]).toEqual(expectedOutput[1]);
  });

  // it('Should have the correct service name on the graph', () => {
  //   expect(graph).outerHTML.includes('title').toBe('ServiceName');
  // });

  // describe('prettyTimeInReverse', () => {
  //   test('Should reverse time and format properly', () => {
  //     const result = HealthChart.prettyTimeInReverse(mockData.ServiceName.Metric.time);
  //     expect(result).toEqual(expectedOutput);
  //   });
  // });
});
