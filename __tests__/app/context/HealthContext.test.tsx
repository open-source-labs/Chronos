import React, { useContext, useState } from 'react';
import { mount } from 'enzyme';
const { ipcRenderer } = require('electron');

import HealthContextProvider, { HealthContext } from '../../../app/context/HealthContext';

// Setup electron mock
jest.mock('electron', () => ({
  ipcRenderer: { on: jest.fn(), send: jest.fn(), removeAllListeners: jest.fn() },
}));

describe('<HealthContext />', () => {
  let wrapper: any;
  beforeEach(() => {
    // Mock component that has access to HealthContext
    const TestComponent = () => {
      const { fetchHealthData, healthData, setHealthData, parseHealthData } = useContext(
        HealthContext
      );
      const [mockData, setMockData] = useState([
        {
          activememory: 12,
          blockedprocesses: 98,
          cpuloadpercent: 12,
          cpuspeed: 43,
          cputemp: 5,
          freememory: 5,
          id: 6,
          latency: 41,
          runningprocesses: 12,
          sleepingprocesses: 312,
          time: '',
          totalmemory: 1,
          usememory: 3,
        },
        {
          activememory: 13,
          blockedprocesses: 43,
          cpuloadpercent: 1,
          cpuspeed: 32,
          cputemp: 32,
          freememory: 76,
          id: 8,
          latency: 51,
          runningprocesses: 153,
          sleepingprocesses: 33,
          time: '',
          totalmemory: 4,
          usememory: 6,
        },
      ]);

      return (
        <>
          <div id="healthData">{JSON.stringify(healthData)}</div>
          <div id="parsedData">{JSON.stringify(mockData)}</div>
          <button id="fetchHealthData" onClick={() => fetchHealthData('books')}>
            Test fetchHealthData
          </button>
          <button id="setHealthData" onClick={() => setHealthData({ foo: 'bar' })}>
            Test setHealthData
          </button>
          <button
            id="parseHealthData"
            onClick={() => {
              const result = parseHealthData(mockData);
              setMockData(result);
            }}
          ></button>
        </>
      );
    };

    // Provide HealthContext to component
    wrapper = mount(
      <HealthContextProvider>
        <TestComponent />
      </HealthContextProvider>
    );
  });

  it('should render', () => {
    expect(wrapper.exists).toBeTruthy;
  });

  it('should parse incoming health data into an object of arrays for every data type', () => {
    const parsedData = {
      activememory: [12, 13],
      blockedprocesses: [98, 43],
      cpuloadpercent: [12, 1],
      cpuspeed: [43, 32],
      cputemp: [5, 32],
      freememory: [5, 76],
      id: [6, 8],
      latency: [41, 51],
      runningprocesses: [12, 153],
      sleepingprocesses: [312, 33],
      time: ['', ''],
      totalmemory: [1, 4],
      usememory: [3, 6],
    };

    const button = wrapper.find('#parseHealthData');
    button.simulate('click');
    expect(wrapper.find('#parsedData').text()).toEqual(JSON.stringify(parsedData));
  });

  it("should emit the 'healthRequest' event and listen on 'healthResponse' when invoking fetchHealthData", () => {
    const button = wrapper.find('#fetchHealthData');
    button.simulate('click');
    expect(ipcRenderer.send).toHaveBeenCalledWith('healthRequest', 'books');
    expect(ipcRenderer.on).toHaveBeenCalledWith('healthResponse', expect.any(Function));
  });

  it('should update healthData when setHealthData is invoked with new data', () => {
    const button = wrapper.find('#setHealthData');
    button.simulate('click');
    expect(wrapper.find('#healthData').text()).toEqual(JSON.stringify({ foo: 'bar' }));
  });
});
