import React, { useContext, useState } from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import HealthContextProvider, { HealthContext } from '../../app/context/HealthContext';
import mockData from '../mock_data.json';

const { ipcRenderer } = window.require('electron');

jest.mock('electron', () => ({ ipcRenderer: { sendSync: jest.fn() } }));

xdescribe('<HealthContext />', () => {
  const { fetchHealthData, healthData, setHealthData, parseHealthData } = useContext(HealthContext);
  const [mData, setMockData] = useState(mockData);
  const TestComponent = () => (
    <>
      <div id="healthData" test-id="mockHealthData">
        {JSON.stringify(healthData)}
      </div>
      <div id="parsedData" test-id="mockParsedData">
        {JSON.stringify(mData)}
      </div>
      <button id="fetchHealthData" onClick={() => fetchHealthData('books')}>
        Test fetchHealthData
      </button>
      <button id="setHealthData" onClick={() => setHealthData({ foo: 'bar' })}>
        Test setHealthData
      </button>
      <button
        id="parseHealthData"
        onClick={() => {
          const result = parseHealthData(mData);
          setMockData(result);
        }}
      >
        test parseHelthData
      </button>
    </>
  );

  beforeEach(() => {
    render(
      <HealthContextProvider>
        <TestComponent />
      </HealthContextProvider>
    );
  });

  it('should render', () => {
    expect(screen).toBeTruthy();
  });

  it('should parseHealthData', () => {
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

    const button = screen.getByText('test parseHelthData');
    fireEvent.click(button);
    expect(screen.getAllByTestId('mockParsedData')).toEqual(JSON.stringify(parsedData));
  });
});
