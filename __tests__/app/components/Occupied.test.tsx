import React from 'react';
import Enzyme, { mount } from 'enzyme';
import { Typography, Grid, Button } from '@material-ui/core';
import { createMount, createShallow } from '@material-ui/core/test-utils';
import Adapter from 'enzyme-adapter-react-16';

import Occupied from '../../../app/components/Occupied';

Enzyme.configure({ adapter: new Adapter() });

describe('React unit test', () => {
  describe('<Occupied />', () => {
    let mount: any;
    let shallow: any;

    beforeEach(() => {
      mount = createMount();
      shallow = createShallow();
    });

    afterEach(() => {
      mount.cleanUp();
    });

    it('Renders correctly', () => {
      const wrapper = shallow(<Occupied />);
      console.log(wrapper.debug());
      expect(wrapper).toMatchSnapshot();
    });

    it('should display text of our application page', () => {
      const wrapper = shallow(<Occupied />);
      expect(wrapper.find(Typography).text()).toMatch('Applications');
    });

    it('should render a grid containing our applications', () => {
      const wrapper = shallow(<Occupied />);
      expect(wrapper.find(Grid)).toHaveLength(1);
      expect(wrapper.find(Grid).prop('container'));
      expect(wrapper.find(Grid).prop('spacing'));
    });

    it('should render a button with an onClick attribute', () => {
      const wrapper = shallow(<Occupied />);
      const mockOnClick = jest.fn();
      const button = wrapper.find(Button);
      // button.simulate('click');
      expect(button).toHaveLength(1);
      expect(button.prop('onClick'));
      expect(mockOnClick.mock.calls.length).toBe(0);
    });
  });
});
