import React from 'react';
import Enzyme, { mount } from 'enzyme';
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
  });
});

// xdescribe('<Occupied />', () => {
//   it('should');
// });
