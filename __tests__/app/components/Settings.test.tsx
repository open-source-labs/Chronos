import React, {useContext} from 'react';
import { createMount, createShallow } from '@material-ui/core/test-utils';

import DashboardContextProvider, { DashboardContext } from '../../../app/context/DashboardContext';
import Settings from '../../../app/components/Settings';
const { ipcRenderer } = require('electron');
jest.mock('electron', () => ({ ipcRenderer: { sendSync: jest.fn() } }));

xdescribe('<Settings />', () => {
  let wrapper: any;
  let mount: any;
  let shallow: any;

  beforeEach(() => {
    mount = createMount();
    shallow = createShallow();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  it("should render ", () => {
    const wrapper = mount(
    <DashboardContextProvider>
      <Settings />
    </DashboardContextProvider>
  );
   expect(wrapper.exists).toBeTruthy;
  });

  it("should have a button with text value of Light", () => {
    const wrapper = mount(
    <DashboardContextProvider>
      <Settings />
    </DashboardContextProvider>
  );
    const button = wrapper.find('#lightMode');
    // button.simulate('click');
   expect(button.text()).toEqual('Light')
  });

  it("should emit the changeApp event when click light mode", () => {
    const wrapper = mount(
    <DashboardContextProvider>
      <Settings />
    </DashboardContextProvider>
  );
    const button = wrapper.find('#lightMode');
    button.simulate('click');
  expect(ipcRenderer.sendSync).toHaveBeenCalledWith('changeMode', 'light mode');
  });

  it("should emit the changeApp event when click dark mode", () => {
    const wrapper = mount(
    <DashboardContextProvider>
      <Settings />
    </DashboardContextProvider>
  );
    const button = wrapper.find('#darkMode');
    button.simulate('click');
  expect(ipcRenderer.sendSync).toHaveBeenCalledWith('changeMode', 'dark mode');
  });

  it("should have a button with text value of Dark", () => {
    const wrapper = mount(
    <DashboardContextProvider>
      <Settings />
    </DashboardContextProvider>
  );
    const button = wrapper.find('#darkMode');
    // button.simulate('click');
   expect(button.text()).toEqual('Dark')
  });


});