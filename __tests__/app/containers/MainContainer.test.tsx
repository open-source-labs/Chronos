import React from 'react';
import { configure, shallow, render } from 'enzyme';
import { Route, Switch } from 'react-router-dom';


import MainContainer from '../../../app/containers/MainContainer'
import Home from '../../../app/components/Home'
import Copyright from '../../../app/components/Copyright'
import Occupied from '../../../app/components/Occupied'
import GraphsContainer from '../../../app/containers/GraphsContainer'
import About from '../../../app/components/About'
import Contact from '../../../app/components/Contact';
import Settings from '../../../app/components/Settings';

describe('<MainContainer />', () => {
  it(' renders component Home', () => {
    const wrapper = shallow(<MainContainer />);

    expect(wrapper.contains(<Route exact path="/" component={Home} />)).toBe(true);
  });
  it('renders component Copyright', () => {
    const wrapper = shallow (<MainContainer />);

    expect(wrapper.contains(<Copyright />)).toBe(true);

  })
  it('renders component Occupied', () => {
    const wrapper = shallow (<MainContainer />);

    expect(wrapper.contains(<Route exact path="/applications" component={Occupied} />)).toBe(true);

  })
   it('renders container GraphsContainer', () => {
    const wrapper = shallow (<MainContainer />);

    expect(wrapper.contains(<Route exact path="/applications/:app/:service" component={GraphsContainer} />)).toBe(true);

  })
  it('renders container About', () => {
    const wrapper = shallow (<MainContainer />);

    expect(wrapper.contains(<Route path="/about" component={About} />)).toBe(true);

  })
  it('renders container Contact', () => {
    const wrapper = shallow (<MainContainer />);

    expect(wrapper.contains(<Route path="/contact" component={Contact} />)).toBe(true);

  })
  it('renders container Settings', () => {
    const wrapper = shallow (<MainContainer />);

    expect(wrapper.contains(<Route path="/settings" component={Settings} />)).toBe(true);

  })
  
});


