import React from 'react';
import { mount } from 'enzyme';
import { createMount, createShallow, createRender } from '@material-ui/core/test-utils';
import { Link } from '@material-ui/core';

import Copyright from '../../../app/components/Copyright';

describe('React unit test', () => {
  describe('<Copyright/>', () => {
    let wrapper: any;
    let mount: any;
    let shallow: any;
    let copy: any = <Copyright />;

    beforeEach(() => {
      mount = createMount();
      shallow = createShallow(copy);
      // wrapper = mount(<Copyright />);
    });

    afterEach(() => {
      mount.cleanUp();
    });

    it('renders correctly', () => {
      const wrapper = shallow(<Copyright />);
      console.log(wrapper.debug());
      expect(wrapper).toMatchSnapshot();
    });

    it('should contain link to chronos website', () => {
      const wrapper = shallow(<Copyright />);
      expect(wrapper.find(Link)).toHaveLength(1);
      expect(wrapper.find(Link)).toHaveProperty('href');
    });
  });
});
