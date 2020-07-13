import React from 'react';
import { configure, shallow, render } from 'enzyme';

import SidebarContainer from '../../../app/containers/SidebarContainer'
import { Link } from 'react-router-dom';


describe('<SidebarContainer />', () => {
  it('should render an <img> tag with the Chronos logo', () => {
    const wrapper = shallow(<SidebarContainer />);
    
    expect(wrapper.contains(<img alt="Chronos Logo" id="serviceDashLogo" src="../assets/icon2Cropped.png" />)).toBe(true);
  });
  it("should render a <Link /> with the label as 'Home'", () => {
    const wrapper = shallow(<SidebarContainer />);

    expect(wrapper.contains(<Link className="sidebar-link" to="/">
    Home
  </Link>)).toBe(true)
  });
  it("should render a <Link /> with the label as 'About'", () => {
    const wrapper = shallow(<SidebarContainer />);

    expect(wrapper.contains(<Link className="sidebar-link" to="/"> 
    About 
  </Link>)).toBe(true)
  });
  it("should render a <Link /> with the label as 'Contact'", () => {
    const wrapper = shallow(<SidebarContainer />);

    expect(wrapper.contains(<Link className="sidebar-link" to="/"> 
    Contact 
  </Link>)).toBe(true)
  });
  it("should render a <Link /> with the label as 'Settings'", () => {
    const wrapper = shallow(<SidebarContainer />);

    expect(wrapper.contains(<Link className="sidebar-link" to="/"> 
    Settings 
  </Link>)).toBe(true)
  });

  
});








  
