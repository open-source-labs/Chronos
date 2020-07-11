import React from 'react';
import { mount } from 'enzyme';
import { createMount, createShallow } from '@material-ui/core/test-utils';

import Copyright from '../../../app/components/Copyright';

describe('React unit test', () => {
  describe('<Copyright/>', () => {
    let wrapper: any;
    let mount: any;
    let shallow: any;

    beforeAll(() => {
      mount = createMount();
      shallow = createShallow();
      wrapper = mount(<Copyright />);
    });

    afterAll(() => {
      mount.cleanUp();
    });

    it('should contain link to chronos website', () => {
      const linkTag = wrapper.find('Link');
      expect(linkTag).toBeDefined();
    });
  });
});
