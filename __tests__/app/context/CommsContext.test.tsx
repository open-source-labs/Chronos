import React, { useContext, useState } from 'react';
import { mount, shallow } from 'enzyme';
const { ipcRenderer } = require('electron');

import CommsContextProvider, { CommsContext } from '../../../app/context/CommsContext';

// Setup electron mock
jest.mock('electron', () => ({ ipcRenderer: { on: jest.fn(), send: jest.fn() } }));

describe('React unit tests', () => {
  describe('<CommsContext />', () => {
    let wrapper: any;

    beforeEach(() => {
      const TestComponent = () => {
        const { commsData, setCommsData, fetchCommsData } = useContext(CommsContext);
        const [mockData, setMockData] = useState([
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
        ]);
        return (
          <>
            <div id="dockerData">{JSON.stringify(commsData)}</div>
            <div id="parsedData">{JSON.stringify(mockData)}</div>
            <button id="fetchDockerData" onClick={() => fetchCommsData('customers')}>
              Test fetchDockerData
            </button>
            <button id="setDockerData" onClick={() => setCommsData({ foo: 'bar' })}>
              Test setDockerData
            </button>
          </>
        );
      };
      wrapper = mount(
        <CommsContextProvider>
          <TestComponent />
        </CommsContextProvider>
      );
    });

    it('should render correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
