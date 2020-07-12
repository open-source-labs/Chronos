import React, { useContext } from 'react';
import { mount } from 'enzyme';
const { ipcRenderer } = require('electron');

import HealthContextProvider, { HealthContext } from '../../../app/context/HealthContext';

// Setup electron mock
jest.mock('electron', () => ({ ipcRenderer: { on: jest.fn(), send: jest.fn() } }));

describe('<HealthContext />', () => {
  let wrapper: any;
  beforeEach(() => {
    // Mock component that has access to HealthContext
    const TestComponent = () => {
      const { fetchHealthData, healthData, setHealthData } = useContext(HealthContext);

      return (
        <>
          <p>{JSON.stringify(healthData)}</p>
          <button id="fetchHealthData" onClick={() => fetchHealthData('books')}>
            Test fetchHealthData
          </button>
          <button id="setHealthData" onClick={() => setHealthData({ foo: 'bar' })}>
            Test setHealthData
          </button>
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

  it("should emit the 'healthRequest' event and listen on 'healthResponse' when invoking ", () => {
    const button = wrapper.find('#fetchHealthData');
    button.simulate('click');
    expect(ipcRenderer.send).toHaveBeenCalledWith('healthRequest', 'books');
    expect(ipcRenderer.on).toHaveBeenCalledWith('healthResponse', expect.any(Function));
  });

  it('should update healthData when setHealthData is invoked with new data', () => {
    const button = wrapper.find('#setHealthData');
    button.simulate('click');
    expect(wrapper.find('p').text()).toEqual(JSON.stringify({ foo: 'bar' }));
  });
});
