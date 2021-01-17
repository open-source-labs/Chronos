import React from 'react';
import { mount } from 'enzyme';

import AddModal from '../../../app/modals/AddModal';
import { DashboardContext } from '../../../app/context/DashboardContext';

describe('<AddModal />', () => {
  let wrapper: any;
  beforeAll(() => {
    const setOpen = jest.fn();
    const addApp = jest.fn();

    const mockAddModal = (
      <DashboardContext.Provider value={{ addApp }}>
        <AddModal setOpen={setOpen} />
      </DashboardContext.Provider>
    );

    wrapper = mount(mockAddModal);
  });

  it('should render a <form> with an onSubmit property', () => {
    const formTag = wrapper.find('.add-container form');
    expect(formTag).toBeDefined()
    expect(typeof formTag.prop('onSubmit')).toEqual('function')
  });

  it('should render a <select> with an onChange property', () => {
    const selectTag = wrapper.find('#db-type')
    expect(selectTag).toBeDefined()
    expect(typeof selectTag.prop('onChange')).toEqual('function')
  });

  it('should render a <input> for db URI with an onChange property', () => {
    const inputTag = wrapper.find('#db-uri')
    expect(inputTag).toBeDefined()
    expect(typeof inputTag.prop('onChange')).toEqual('function')
  });

  it('should render a <input> for db name with an onChange property', () => {
    const inputTag = wrapper.find('#db-name')
    expect(inputTag).toBeDefined()
    expect(typeof inputTag.prop('onChange')).toEqual('function')
  });

  it("should render a <button> with a label 'Submit'", () => {
    const buttonTag = wrapper.find('form button')
    expect(buttonTag).toBeDefined()
    expect(buttonTag.text()).toEqual('Submit')
  });

  xit('should invoke onSubmit when the form button is clicked', () => {
    // const buttonTag = wrapper.find('form button')
    // const onSubmit = wrapper.find('.add-container form').prop('onSubmit')
    // const formTag = wrapper.find('.add-container form')
  })

  xit('should invoke setOpen when the submit button is clicked', () => {})
});
