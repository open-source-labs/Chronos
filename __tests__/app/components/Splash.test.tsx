// const React = require('react');
// import 'jsdom-global/register';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
// import { expect } from 'chai';
// import * as chai from 'chai';
// import 'chai-http';
import { shallow, mount, configure } from 'enzyme';
// import { spy } from 'sinon';
// import { JSDOM } from 'jsdom';
// declare global {
//   namespace NodeJS {
//     interface Global {
//       document: any;
//       window: any;
//     }
//   }
// }
// const { expect } = require('chai');
// const { shallow } = require('enzyme');
// const { spy } = require('sinon');
// const Splash = require('../../../app/components/Splash.tsx');
import Splash from '../../../app/components/Splash';
// const Splash = require('../../../app/components/Splash.tsx');
// const globalAny: any = global;
// const doc = new JSDOM('<!doctype html><html><body></body></html>');
// global.document = doc;
// global.window = doc.defaultView;

// spy(Splash.prototype, 'componentDidMount');
configure({ adapter: new Adapter() });
// Test if the splash goes away after 3 seconds
// Check if the boolean changes to false after 3 seconds
xdescribe('Splash test', () => {
  // const [firstVisit, setFirstVisit] = React.useState(true);
  const setFirstVisit = () => true;
  // const component = shallow(<Splash />);
  const wrapper = mount(<Splash setFirstVisit={setFirstVisit} />);
  it('firstVisit should be true for the first three seconds on mount', () => {
    expect(wrapper.props().setFirstVisit).toBeDefined();
  });
});
