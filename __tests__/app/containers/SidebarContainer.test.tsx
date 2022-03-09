import React from 'react';
import { configure, shallow, render } from 'enzyme';

// import HomeSharpIcon from '@material-ui/icons/HomeSharp';
import ListIcon from '@material-ui/icons/List';
import InfoIcon from '@material-ui/icons/Info';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import SettingsIcon from '@material-ui/icons/Settings';
import SidebarContainer from '../../../app/containers/SidebarContainer';
import { Link } from 'react-router-dom';

xdescribe('<SidebarContainer />', () => {
  it('should render an <img> tag with the Chronos logo', () => {
    const wrapper = shallow(<SidebarContainer />);
    expect(wrapper.contains(<img alt="Chronos" id="logo" src="../assets/logo.svg" />)).toBe(true);
  });

  it("should render a <Link /> with the label as 'Dashboard'", () => {
    const wrapper = shallow(<SidebarContainer />);

    expect(
      wrapper.contains(
        <Link className="sidebar-link" to="/applications" id="dash">
          <ListIcon
            style={{
              WebkitBoxSizing: 'content-box',
              boxShadow: 'none',
              width: '35px',
              height: '35px',
            }}
          />
          &emsp;Dashboard
        </Link>
      )
    ).toBe(true);
  });

  it("should render a <Link /> with the label as 'About'", () => {
    const wrapper = shallow(<SidebarContainer />);

    expect(
      wrapper.contains(
        <Link className="sidebar-link" to="/about" id="about">
          <InfoIcon
            style={{
              WebkitBoxSizing: 'content-box',
              boxShadow: 'none',
              width: '35px',
              height: '35px',
            }}
          />
          &emsp;About
        </Link>
      )
    ).toBe(true);
  });

  it("should render a <Link /> with the label as 'Contact'", () => {
    const wrapper = shallow(<SidebarContainer />);

    expect(
      wrapper.contains(
        <Link className="sidebar-link" to="/contact" id="contact">
          <ContactSupportIcon
            style={{
              WebkitBoxSizing: 'content-box',
              boxShadow: 'none',
              width: '35px',
              height: '35px',
            }}
          />
          &emsp;Contact
        </Link>
      )
    ).toBe(true);
  });

  it("should render a <Link /> with the label as 'Settings'", () => {
    const wrapper = shallow(<SidebarContainer />);

    expect(
      wrapper.contains(
        <Link className="sidebar-link" to="/settings" id="settings">
          <SettingsIcon
            style={{
              WebkitBoxSizing: 'content-box',
              boxShadow: 'none',
              width: '35px',
              height: '35px',
            }}
          />
          &emsp;Settings
        </Link>
      )
    ).toBe(true);
  });
});
