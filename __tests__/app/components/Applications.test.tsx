import React from 'react';
import { mount } from 'enzyme';
import { createMount, createShallow } from '@material-ui/core/test-utils';

import Applications from '../../../app/components/Applications';
import { DashboardContext } from '../../../app/context/DashboardContext';

describe('React unit tests', () => {
  describe('<Application/>', () => {
    let wrapper: any;
    let mount: any;

    beforeAll(() => {
      const applications: any = [];
      const getApplications: any = jest.fn();
      mount = createMount();

      const mockApp = (
        <DashboardContext.Provider value={{ applications, getApplications }}>
          <Applications />
        </DashboardContext.Provider>
      );
      wrapper = mount(mockApp);
    });

    afterAll(() => {
      mount.cleanUp();
    });

    it('should contain a modal', () => {
      console.log(wrapper.debug());
      expect(wrapper.length).toBe(1);
    });
  });
});
