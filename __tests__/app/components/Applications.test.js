import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { createShallow } from '@material-ui/core/test-utils';
import Adapter from 'enzyme-adapter-react-16';

// Import our Component and Icons
import Applications from '../../../app/components/Applications';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';

configure({ adapter: new Adapter() });

describe('React unit tests', () => {
  describe('<Applications />', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(<Applications />);
      // shallow = createShallow();
    });

    xit('Should render a delete icon', () => {
      // expect(wrapper.find(<DeleteForeverOutlinedIcon />));
    });

    xit('Should have delete functionality', () => {});

    xit('Should contain grid items', () => {});

    xit('Should have three grid items', () => {
      const wrapper = shallow(<Applications />);
      expect(wrapper.toHaveLength(3));
    });
  });
});
