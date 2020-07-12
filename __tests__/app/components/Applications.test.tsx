import React from 'react';
import { mount } from 'enzyme';
import { createMount, createShallow } from '@material-ui/core/test-utils';

import Applications from '../../../app/components/Applications';
import { DashboardContext } from '../../../app/context/DashboardContext';

describe('React unit tests', () => {
  describe('<Application/>', () => {
    let wrapper: any;
    let mount: any;
    let shallow: any;

    beforeAll(() => {
      const applications: any = [];
      const getApplications: any = jest.fn();
      mount = createMount();
      shallow = createShallow();

      wrapper = mount(
        <DashboardContext.Provider value={{ applications, getApplications }}>
          <Applications />
        </DashboardContext.Provider>
      );
    });

    afterAll(() => {
      mount.cleanUp();
    });

    it('should render properly', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
