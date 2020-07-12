import React, { useContext } from 'react';
import { mount } from 'enzyme';
import DashboardContextProvider, { DashboardContext } from '../../../app/context/DashboardContext';
const { ipcRenderer } = require('electron');

// Setup mock ipc processes
jest.mock('electron', () => ({ ipcRenderer: { sendSync: () => [1,2,3] } }));

xdescribe('<DashboardContext />', () => {
  let wrapper;
  beforeEach(() => {
    // Mock component that has access to Dashboard Context
    const TestComponent = () => {
      const { applications, getApplications, addApp, deleteApp } = useContext(DashboardContext);

      return (
        <>
          <p>{JSON.stringify(applications)}</p>
          <button id="addApp" onClick={() => addApp()}>
            Test addApp
          </button>
          <button id="deleteApp" onClick={() => deleteApp()}>
            Test deleteApp
          </button>
          <button id="getApplications" onClick={() => getApplications()}>
            Test getApplications
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

  xit('should render', () => {});
  xit('should emit the \'addApp\' event when invoking addApp', () => {})
  xit('should emit the \'deleteApp\' event when invoking deleteApp', () => {})
  xit('should emit the \'getApps\' event when invoking getApplications', () => {})
});
