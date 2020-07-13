import React, { useContext, useState } from 'react';
import { mount } from 'enzyme';
const { ipcRenderer } = require('electron');

import DockerContextProvider, { DockerContext } from '../../../app/context/DockerContext';

// Setup electron mock
jest.mock('electron', () => ({ ipcRenderer: { on: jest.fn(), send: jest.fn() } }));

describe('React unit tests', () => {
  describe('<DockerContext />', () => {
    let wrapper: any;

    beforeEach(() => {
      const TestComponent = () => {
        const { dockerData, setDockerData, fetchDockerData } = useContext(DockerContext);
        const [mockData, setMockData] = useState([
          {
            containerid: 'f57f5815cb0',
            containername: 'chronos-mon-2',
            cpupercent: 0.3,
            memorylimit: 16665812992,
            memorypercent: 0.3,
            memoryusage: 48480256,
            networkreceived: 6562749,
            networksent: 0,
            platform: 'Linux',
            processcount: 35,
            restartcount: 0,
            starttime: 'Thu Jul 02 2020 16:18:50 GMT-0700 ',
            id: '5efe95ded17eaf0020a80c80',
          },
        ]);
        return (
          <>
            <div id="dockerData">{JSON.stringify(dockerData)}</div>
            <div id="parsedData">{JSON.stringify(mockData)}</div>
            <button id="fetchDockerData" onClick={() => fetchDockerData('chronos-mon-3')}>
              Test fetchDockerData
            </button>
            <button id="setDockerData" onClick={() => setDockerData({ foo: 'bar' })}>
              Test setDockerData
            </button>
          </>
        );
        // Provide HealthContext to component
      };
      wrapper = mount(
        <DockerContextProvider>
          <TestComponent />
        </DockerContextProvider>
      );
    });

    it('should render', () => {
      expect(wrapper).toMatchSnapshot();
    });

    xit('should parse incoming docker info into an object of arrays for every data type', () => {
      const parsedData = {
        activememory: [2599420000, 2599420001],
        blockedprocesses: [0, 1],
        cpuloadpercent: [12, 1],
        cpuspeed: [2.7, 2.8],
        cputemp: [80, 81],
        freememory: [97890300, 97890301],
        latency: [21, 22],
        runningprocesses: [12, 13],
        sleepingprocesses: [427, 428],
        time: ['2020-06-27T05:31:35.554Z', '2020-06-28T05:31:35.554Z'],
        totalmemory: [8589930000, 8589930001],
        totalprocesses: [442, 443],
        usedmemory: [8492040000, 8492040001],
        id: [36, 37],
      };

      const button = wrapper.find('#parseHealthData');
      button.simulate('click');
      expect(wrapper.find('#parsedData').text()).toEqual(JSON.stringify(parsedData));
    });

    it("should emit the 'dockerRequest' event and listen on 'dockerResponse' when invoking fetchDockerData", () => {
      const button = wrapper.find('#fetchDockerData');
      button.simulate('click');
      expect(ipcRenderer.send).toHaveBeenCalledWith('dockerRequest', 'chronos-mon-3');
      expect(ipcRenderer.on).toHaveBeenCalledWith('dockerResponse', expect.any(Function));
    });

    it('should update dockerData when setDockerData is invoked with new data', () => {
      const button = wrapper.find('#setDockerData');
      button.simulate('click');
      expect(wrapper.find('#dockerData').text()).toEqual(JSON.stringify({ foo: 'bar' }));
    });
  });
});
