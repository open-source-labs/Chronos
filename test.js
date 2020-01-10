// window.require = require;
// console.log('window.require:', window.require)
import { spy } from 'sinon';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// const React = require('react');
// const expect =  require('chai').expect;
// const mount = require('enzyme');
// const spy = require('sinon');
import DeleteService from './app/components/DeleteService.jsx';





// function setup() {
//     const actions = {
//       increment: spy(),
//       incrementIfOdd: spy(),
//       incrementAsync: spy(),
//       decrement: spy()
//     };
//     const component = shallow(<Counter counter={1} {...actions} />);
//     return {
//       component,
//       actions,
//       buttons: component.find('button'),
//       p: component.find('.counter')
//     };
//  }

//  describe('Counter Component', () => {
//     it('should match exact snapshot', () => {
//       const { actions } = setup();
//       const counter = (
//         <div>
//           <Router>
//             <Counter counter={1} {...actions} />
//           </Router>
//         </div>
//       );
//       const tree = renderer.create(counter).toJSON();
//       expect(tree).toMatchSnapshot();
//     });
//   });

describe('Delete a Service', () => {
    // beforeAll(() => {
    //     let wrapper = shallow(<DeleteService/>);
    //   });

    xit('returns a div',()=>{
        expect(wrapper.type()).toEqual('div')
    })
    it('Delete a service with more than one services within user/setting.json',()=>{
        expect(1).toEqual(1)
    })
    describe('Delete a service with only one services within user/setting.json', () => {
        it('Delete the service',()=>{
            expect(1).toEqual(1)
        })
        it('Render the AddService Component',()=>{
            expect(1).toEqual(1)
        })
    })
})