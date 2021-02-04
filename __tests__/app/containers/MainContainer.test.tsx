import React from 'react';
import { configure, shallow, render } from 'enzyme';
import { Route, Switch } from 'react-router-dom';
import { createMount, createShallow } from '@material-ui/core/test-utils';

import DashboardContextProvider { DashboardContext } from '../../../app/context/DashboardContext';
import MainContainer from '../../../app/containers/MainContainer';
import Home from '../../../app/components/Home';
import Copyright from '../../../app/components/Copyright';
import Occupied from '../../../app/components/Occupied';
import GraphsContainer from '../../../app/containers/GraphsContainer';
import About from '../../../app/components/About';
import Contact from '../../../app/components/Contact';
import Settings from '../../../app/components/Settings';
/** Main Container testing not implemented
describe('<MainContainer />', () => {
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
  it('renders component Occupied', () => {
    const wrapper = mount(
    <DashboardContextProvider.Provider>
      <MainContainer  />
    </DashboardContextProvider.Provider>
    );

    expect(wrapper.contains(<Route exact path="/applications" component={Occupied} />)).toBe(true);
  });
  xit('renders container GraphsContainer', () => {
    const wrapper = shallow(<MainContainer />);

    expect(
      wrapper.contains(
        <Route exact path="/applications/:app/:service" component={GraphsContainer} />
      )
    ).toBe(true);
  });
  xit('renders container About', () => {
    const wrapper = shallow(<MainContainer />);

    expect(wrapper.contains(<Route exact path="/about" component={About} />)).toBe(true);
  });
  xit('renders container Contact', () => {
    const wrapper = shallow(<MainContainer />);

    expect(wrapper.contains(<Route exact path="/contact" component={Contact} />)).toBe(true);
  });
  xit('renders container Settings', () => {
    const wrapper = shallow(<MainContainer />);

    expect(wrapper.contains(<Route exact path="/settings" component={Settings} />)).toBe(true);
  });
});
*/
