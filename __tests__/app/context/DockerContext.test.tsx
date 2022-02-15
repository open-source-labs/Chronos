import React, { useContext, useState } from 'react';
import { mount, shallow } from 'enzyme';
const { ipcRenderer } = require('electron');

import DockerContextProvider, { DockerContext } from '../../../app/context/DockerContext';

// Setup electron mock
jest.mock('electron', () => ({
  ipcRenderer: { on: jest.fn(), send: jest.fn(), removeAllListeners: jest.fn() },
}));

describe('React unit tests', () => {
  describe('<DockerContext />', () => {
    let wrapper: any;
    let shallow: any;

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
      };
      wrapper = mount(
        <DockerContextProvider>
          <TestComponent />
        </DockerContextProvider>
      );
    });

    xit('should render', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should display a given container name', () => {
      const containerName = wrapper.find('#parsedData');
      expect(containerName.text()).toMatch('chronos-mon-2');
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

    it('should note which platform is being used', () => {
      const parsedData = wrapper.find('#parsedData');
      expect(parsedData.text()).toMatch('Linux');
    });
  });
});
