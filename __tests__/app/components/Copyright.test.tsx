import React from 'react';
import Enzyme, { mount } from 'enzyme';
import { createMount, createShallow } from '@material-ui/core/test-utils';
import { Link, Typography } from '@material-ui/core';
import Adapter from 'enzyme-adapter-react-16';

import Copyright from '../../../app/components/Copyright';

Enzyme.configure({ adapter: new Adapter() });

xdescribe('React unit test', () => {
  describe('<Copyright/>', () => {
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

    xit('renders correctly', () => {
      const wrapper = shallow(<Copyright />);
      expect(wrapper).toMatchSnapshot();
    });

    it('should contain link to chronos website', () => {
      const wrapper = shallow(<Copyright />);
      expect(wrapper.find(Link)).toHaveLength(1);
      expect(wrapper.find(Link).prop('href'));
      expect(wrapper.find(Link).prop('href')).toEqual('https://chronoslany.com/');
    });

    xit('should route user to Chronos website', () => {
      const wrapper = shallow(<Copyright />);
      const mockedHandleClick = jest.fn();
      wrapper.instance().handleClick = mockedHandleClick;
      expect(mockedHandleClick).toHaveBeenCalledTimes(1);
    });

    it('should render <Typography /> to display copyright info', () => {
      const wrapper = shallow(<Copyright />);
      expect(wrapper.find(Typography)).toHaveLength(1);
      expect(wrapper.find(Typography).text()).toMatch('Team Chronos');
    });
  });
});
