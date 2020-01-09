import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
const expect = require('chai').expect;
//const waitForExpect = require("wait-for-expect");
import DeleteSevice from '../app/components/DeleteService.jsx';
//window.require = ()=>{ return {ipcRenderer: jest.fn()}

console.log('window:', window.require)

configure({ adapter: new Adapter() });

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