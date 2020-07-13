import React from 'react';
import { configure, shallow, render } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
// import renderer from 'react-test-renderer';
// import { expect } from 'chai';
import DashboardContainer from '../../../app/containers/DashboardContainer';
import MainContainer from '../../../app/containers/MainContainer'
import SidebarContainer from '../../../app/containers/SidebarContainer'
import ApplicationContextProvider from '../../../app/context/ApplicationContext'
// configure({ adapter: new Adapter() });

describe('<DashboardContainer />', () => {
  it(' renders component Maincontainer ', () => {
    const wrapper = shallow(<DashboardContainer />);

    expect(wrapper.contains(<MainContainer />)).toBe(true);
    expect(wrapper.contains(<SidebarContainer />)).toBe(true);
  });

  it(' renders component SidebarContainer', () => {
    const wrapper = shallow(<DashboardContainer />);

    expect(wrapper.contains(<SidebarContainer />)).toBe(true);
  });
  //   it(' renders component SidebarContainer', () => {
  //   const wrapper = shallow(<DashboardContainer />);

  //   expect(wrapper.contains( <ApplicationContextProvider></ApplicationContextProvider>)).toBe(true);
  // });
  
});



// describe('<DashboardContainer />', () => {
//   it('should render <SidebarContainer />');
//   it('should render <MainContainer />');
//   it('should render all of the contexts');
// });
