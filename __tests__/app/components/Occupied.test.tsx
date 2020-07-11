import React from 'react';
import Enzyme, { mount } from 'enzyme';
import { createMount, createShallow } from '@material-ui/core/test-utils';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('React unit test', () => {
  describe('<Occupied />', () => {
    let mount: any;

    beforeEach(() => {
      mount = createMount();
    });

    afterEach(() => {
      mount.cleanUp();
    });
  });
});

// xdescribe('<Occupied />', () => {
//   it('should');
// });
