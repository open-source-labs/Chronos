import React from 'react';
import { mount } from 'enzyme';

import Home from '../../../app/components/Home';
import { DashboardContext } from '../../../app/context/DashboardContext';


describe('<Home />', () => {
  let wrapper: any;

  beforeAll(() => {
    const applications: any = [];
    const getApplications: any = jest.fn();

    const mockHome = (
      <DashboardContext.Provider value={{ applications, getApplications }}>
        <Home />
      </DashboardContext.Provider>
    );
    wrapper = mount(mockHome);
  });

  it('should render an <img/> tag of the Chronos pangolin', () => {
    const image = wrapper.find('img');
    expect(image).toBeDefined();

    const imageProps = image.props();
    expect(imageProps).toHaveProperty('width');
    expect(imageProps).toHaveProperty('height');
    expect(imageProps).toHaveProperty('src');
    expect(imageProps).toHaveProperty('alt');
  });

  it("should render an <h1> tag that says 'Welcome to Chronos!'", () => {
    const h1Tag = wrapper.find('h1');
    expect(h1Tag.text()).toMatch('Welcome to Chronos!');
  });

  it("should render a <Link> tag that is labeled 'Get Started'", () => {
    const linkTag = wrapper.find('Link');
    expect(linkTag).toBeDefined();
    expect(linkTag.text()).toMatch('Get started');
    expect(linkTag.prop('to')).toEqual('/applications');
  });
});
