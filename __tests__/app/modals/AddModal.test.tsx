import React from 'react';
import { mount, shallow } from 'enzyme';

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

    wrapper = shallow(<AddModal setOpen={setOpen}/>);
  });

  it('should render a <form> with an onSubmit property', () => {
    // const mockOnSubmit = jest.fn();
    // console.log(wrapper.debug());
    // const thing = wrapper.find('.add-container form');
    // console.log('thing ==>>', thing);
  });

  // it('should render a <select> with an onChange property');

  // it('should render a <input> for db types with an onChange property');

  // it('should render a <input> for db URI with an onChange property');

  // it('should render a <input> for db name with an onChange property');

  // it("should render a <button> with a label 'Submit'");
});
