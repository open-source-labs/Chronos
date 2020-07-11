import React from 'react';
import Enzyme, { mount } from 'enzyme';
import { createMount, createShallow, createRender } from '@material-ui/core/test-utils';
import { Link, Typography } from '@material-ui/core';
import Adapter from 'enzyme-adapter-react-16';

import Copyright from '../../../app/components/Copyright';

Enzyme.configure({ adapter: new Adapter() });

describe('React unit test', () => {
  describe('<Copyright/>', () => {
    let wrapper: any;
    let mount: any;
    let shallow: any;
    let copy: any = <Copyright />;

    beforeEach(() => {
      mount = createMount();
      shallow = createShallow();
      // wrapper = mount(<Copyright />);
    });

    afterEach(() => {
      mount.cleanUp();
      // shallow.cleanUp();
    });

    it('renders correctly', () => {
      const wrapper = shallow(<Copyright />);
      console.log(wrapper.debug());
      expect(wrapper).toMatchSnapshot();
    });

    it('should contain link to chronos website', () => {
      const wrapper = shallow(<Copyright />);
      expect(wrapper.find(Link)).toHaveLength(1);
      // expect(wrapper.find(Link)).toHaveProperty('href');
    });

    it('should route user to Chronos website', () => {
      const mockedHandleClick = jest.fn();
      wrapper.instance().handleClick = mockedHandleClick;
      wrapper.find(Link).first().props().onClick();
      expect(mockedHandleClick).toHaveBeenCalledTimes(1);
    });

    it('should render <Typography /> to display copyright info', () => {
      const wrapper = shallow(<Copyright />);
      expect(wrapper.find(Typography)).toHaveLength(1);
    });
  });
});
