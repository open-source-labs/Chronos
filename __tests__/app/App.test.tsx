
import React from 'react';
import { shallow } from 'enzyme';
import App from '../../app/App';
describe('<App />', () => {
  let wrapper: any;
  beforeAll(() => {
    wrapper = shallow(<App />);
  });

  it('should render <Splash /> on the first visit', () => {
    expect(wrapper).toMatchSnapshot()
  });
  // xit('should render <DashboardContainer /> if not on the first visit');
});