import React from 'react';
import { configure, shallow, render } from 'enzyme';

import HomeSharpIcon from '@material-ui/icons/HomeSharp';
import InfoIcon from '@material-ui/icons/Info';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import SettingsIcon from '@material-ui/icons/Settings';
import SidebarContainer from '../../../app/containers/SidebarContainer'
import { Link } from 'react-router-dom';


describe('<SidebarContainer />', () => {
  it('should render an <img> tag with the Chronos logo', () => {
    const wrapper = shallow(<SidebarContainer />);
    console.log(wrapper.debug)
    expect(wrapper.contains(<img alt="Chronos Logo" id="serviceDashLogo" src="../assets/icon2Cropped.png" />)).toBe(true);
  });
  it("should render a <Link /> with the label as 'Home'", () => {
    const wrapper = shallow(<SidebarContainer />);

    expect(wrapper.contains(<Link className="sidebar-link" to="/" id="home">
    <HomeSharpIcon style={{ boxShadow: 'none', width: '40px', height: '40px' }} />
    &emsp;Home
  </Link>)).toBe(true)
  });
  it("should render a <Link /> with the label as 'About'", () => {
    const wrapper = shallow(<SidebarContainer />);

    expect(wrapper.contains(<Link className="sidebar-link" to="/about" id="about">
    <InfoIcon style={{ boxShadow: 'none', width: '40px', height: '40px' }} />
    &emsp;About
  </Link>)).toBe(true)
  });
  it("should render a <Link /> with the label as 'Contact'", () => {
    const wrapper = shallow(<SidebarContainer />);

    expect(wrapper.contains(<Link className="sidebar-link" to="/contact" id="contact">
    <ContactSupportIcon style={{ boxShadow: 'none', width: '40px', height: '40px' }} />
    &emsp;Contact
  </Link>)).toBe(true)
  });
  it("should render a <Link /> with the label as 'Settings'", () => {
    const wrapper = shallow(<SidebarContainer />);

    expect(wrapper.contains(<Link className="sidebar-link" to="/settings" id="settings">
    <SettingsIcon style={{ boxShadow: 'none', width: '40px', height: '40px' }} />
    &emsp;Settings
  </Link>)).toBe(true)
  });

  
});








  
