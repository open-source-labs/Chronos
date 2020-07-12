import React, { useContext } from 'react';
import { shallow, mount } from 'enzyme';

import ApplicationContextProvider, {
  ApplicationContext,
} from '../../../app/context/ApplicationContext';
const { ipcRenderer } = require('electron');

/**
 * Mock ipcRenderer calls
 */
jest.mock('electron', () => ({ ipcRenderer: { on: jest.fn(), send: jest.fn() } }), {
  virtual: true,
});

describe('<ApplicationContext />', () => {
  let wrapper: any;
  beforeEach(() => {

    // Test component that accesses Application Context
    const TestComponent = () => {
      const { connectToDB, fetchServicesNames, setServicesData, servicesData } = useContext(
        ApplicationContext
      );

      return (
        <>
          <p>{servicesData}</p>
          <button id="connectToDB" onClick={() => connectToDB(1)}>
            Test connectToDB
          </button>
          <button id="fetchServicesNames" onClick={() => fetchServicesNames()}>
            Test fetchServicesNames
          </button>
          <button id="setServicesData" onClick={() => setServicesData('new data')}>
            Test setServicesData
          </button>
        </>
      );
    };

    wrapper = mount(
      <ApplicationContextProvider>
        <TestComponent />
      </ApplicationContextProvider>
    );
  });

  it('should render', () => {
    expect(wrapper.exists).toBeTruthy;
  });

  it("should emit the 'connect' event and pass in an 'index' when connectToDB is invoked", () => {
    const button = wrapper.find('#connectToDB');
    button.simulate('click');
    expect(ipcRenderer.send).toHaveBeenCalledWith('connect', 1);
  });

  it("should emit the 'servicesRequest' event and listen on the 'servicesResponse' when fetchServicesNames is invoked", () => {
    const button = wrapper.find('#fetchServicesNames');
    button.simulate('click');
    expect(ipcRenderer.send).toHaveBeenCalledWith('servicesRequest');
    expect(ipcRenderer.on).toBeCalledWith('servicesResponse', expect.any(Function));
  });
});
