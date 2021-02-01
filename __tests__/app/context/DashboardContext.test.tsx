import React, { useContext } from 'react';
import { mount } from 'enzyme';
import DashboardContextProvider, { DashboardContext } from '../../../app/context/DashboardContext';
const { ipcRenderer } = require('electron');

interface IAppInfo {
  database: string;
  URI: string;
  name: string;
}

// Setup mock ipc processes
jest.mock('electron', () => ({ ipcRenderer: { sendSync: jest.fn() } }));

describe('<DashboardContext />', () => {
  let wrapper: any;
  let mockAppInfo: IAppInfo;
  beforeEach(() => {
    mockAppInfo = {
      database: 'mockType',
      URI: 'mockURI',
      name: 'mockName',
    };
    // Mock component that has access to Dashboard Context
    const TestComponent = () => {
      const { applications, getApplications, addApp, deleteApp, mode, changeMode } = useContext(DashboardContext);

      return (
        <>
          <p>{JSON.stringify(applications)}</p>
          <button id="addApp" onClick={() => addApp(mockAppInfo)}>
            Test addApp
          </button>
          <button id="deleteApp" onClick={() => deleteApp(7)}>
            Test deleteApp
          </button>
          <button id="getApplications" onClick={() => getApplications()}>
            Test getApplications
          </button>
          <button id="changeMode" onClick={() => changeMode('light mode')}>
            Test changeMode
          </button>
        </>
      );
    };

    // Provide DashboardContext to component
    wrapper = mount(
      <DashboardContextProvider>
        <TestComponent />
      </DashboardContextProvider>
    );
  });

  it('should render', () => {
    expect(wrapper.exists).toBeTruthy;
  });

  it("should emit the 'addApp' event when invoking addApp", () => {
    const { name, database, URI } = mockAppInfo;
    const button = wrapper.find('#addApp');
    button.simulate('click');
    expect(ipcRenderer.sendSync).toHaveBeenCalledWith(
      'addApp',
      JSON.stringify([name, database, URI, null])
    );
  });

  it("should emit the 'deleteApp' event when invoking deleteApp", () => {
    const button = wrapper.find('#deleteApp');
    button.simulate('click');
    expect(ipcRenderer.sendSync).toHaveBeenCalledWith('deleteApp', 7);
  });

  it("should emit the 'getApps' event when invoking getApplications", () => {
    const button = wrapper.find('#getApplications');
    button.simulate('click');
    expect(ipcRenderer.sendSync).toHaveBeenCalledWith('getApps');
  });

  it("should emit the 'changeMode' event when invoking changeMode", () => {
    const button = wrapper.find('#changeMode');
    button.simulate('click');
    expect(ipcRenderer.sendSync).toHaveBeenCalledWith('changeMode', 'light mode');
  });
});
