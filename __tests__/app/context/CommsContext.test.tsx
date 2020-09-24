import React, { useContext, useState } from 'react';
import { mount, shallow } from 'enzyme';
const { ipcRenderer } = require('electron');

import CommsContextProvider, { CommsContext } from '../../../app/context/CommsContext';

// Setup electron mock
jest.mock('electron', () => ({
  ipcRenderer: { on: jest.fn(), send: jest.fn(), removeAllListeners: jest.fn() },
}));

describe('<CommsContext />', () => {
  let wrapper: any;
  let shallow: any;

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
          <div id="commsData">{JSON.stringify(commsData)}</div>
          <div id="parsedData">{JSON.stringify(mockData)}</div>
          <button id="fetchCommsData" onClick={() => fetchCommsData('customers')}>
            Test fetchCommsData
          </button>
          <button id="setCommsData" onClick={() => setCommsData({ foo: 'bar' })}>
            Test setCommsData
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

  it("should emit the 'commsRequest' event and listen on 'commsResponse' when invoking fetchCommsData", () => {
    const button = wrapper.find('#fetchCommsData');
    button.simulate('click');
    expect(ipcRenderer.send).toHaveBeenCalledWith('commsRequest', 'customers');
    expect(ipcRenderer.on).toHaveBeenCalledWith('commsResponse', expect.any(Function));
  });

  it('should update dockerData when setCommsData is invoked with new data', () => {
    const button = wrapper.find('#setCommsData');
    button.simulate('click');
    expect(wrapper.find('#commsData').text()).toEqual(JSON.stringify({ foo: 'bar' }));
  });

  it('should display status code information', () => {
    expect(wrapper.find('#parsedData').text()).toMatch('GET');
    expect(wrapper.find('#parsedData').text()).toMatch('OK');
  });
});
