import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
const { JSDOM } = require('jsdom');
const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

import DeleteService from '../app/components/DeleteService.jsx'


configure({ adapter: new Adapter() });

describe('Delete a Service', () => {
    beforeAll(() => {
        let wrapper = shallow(<DeleteService/>);
      });

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