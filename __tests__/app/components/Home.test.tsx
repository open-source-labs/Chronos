import React from 'react';
import { createMount, createShallow } from '@material-ui/core/test-utils';

import Home from '../../../app/components/Home';

describe('<Home />', () => {
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

  it("should render an <p> tag that says 'Your all-in-one application monitoring tool'", () => {
    const wrapper = shallow(<Home />);
    const pTag = wrapper.find('p');
    expect(pTag.text()).toMatch('Your all-in-one application monitoring tool');
  });

  it("should render a <Link> tag that is labeled 'Get Started'", () => {
    const wrapper = shallow(<Home />);
    const linkTag = wrapper.find('Link');
    expect(linkTag).toBeDefined();
    expect(linkTag.text()).toMatch('Get Started');
    expect(linkTag.prop('to')).toEqual('/applications');
  });
});
