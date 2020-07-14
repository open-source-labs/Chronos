import React, { useState, useContext } from 'react';
import { mount, shallow } from 'enzyme';
const { ipcRenderer } = require('electron');

import DockerContextProvider, { DockerContext } from '../../../app/context/DockerContext';

// Setup electron mock
jest.mock('electron', () => ({ ipcRenderer: { on: jest.fn(), send: jest.fn() } }));

describe('React unit tests', () => {
  describe('<DockerChart />', () => {
    let wrapper: any;
    let shallow: any;

    beforeEach(() => {
      const TestComponent = () => {
        const { dockerData } = useContext(DockerContext);
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
        const dataPoint = mockData[0];
        return (
          <>
            <div id="docker-stats-chart">
              <header id="docker-stats-chart-header">Docker Container Stats</header>
              <span>Container Name: {dataPoint.containername}</span>
              <span>Container ID: {dataPoint.containerid}</span>
              <span>Platform: {dataPoint.platform}</span>
              <span>Start time: {dataPoint.starttime}</span>
              <span>Memory Usage: {(dataPoint.memoryusage / 1000000).toFixed(2)}</span>
              <span>Memory Limit: {(dataPoint.memorylimit / 1000000).toFixed(2)}</span>
              <span>Memory Percent: {dataPoint.memorypercent.toFixed(2)}%</span>
              <span>CPU percent: {dataPoint.cpupercent.toFixed(2)}%</span>
              <span>Network I/O - Received (Kb): {dataPoint.networkreceived / 1000}</span>
              <span>Network I/O - Sent (Kb): {dataPoint.networksent / 1000}</span>
              <span>Process Count: {dataPoint.processcount}</span>
              <span>Restart Count: {dataPoint.restartcount}</span>
            </div>
          </>
        );
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

    it('should display all tags with docker information', () => {
      expect(wrapper.find('span')).toHaveLength(12);
    });

    it('should display <header> tag with docker stats', () => {
      expect(wrapper.find('header').text()).toEqual('Docker Container Stats');
    });

    it('should display container name, id, platform, and memory usage', () => {
      expect(wrapper.find('div').find('span').at(0).text()).toContain('chronos-mon-2');
      expect(wrapper.find('div').find('span').at(1).text()).toContain('f57f5815cb0');
      expect(wrapper.find('div').find('span').at(2).text()).toContain('Linux');
      expect(wrapper.find('div').find('span').at(4).text()).toContain('48.48');
      expect(wrapper.find('div').find('span').at(5).text()).toContain('16665.81');
    });
  });
});
