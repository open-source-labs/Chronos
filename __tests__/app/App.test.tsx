import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../../app/App';
describe('<App />', () => {
  let wrapper: any;

  beforeAll(() => {
    wrapper = shallow(<App />);
  });
  it('should render <Splash /> on the first visit', () => {
    expect(wrapper).toBeDefined();
  });
  it('should render <DashboardContainer /> if not on the first visit', () => {
    jest.useFakeTimers();
    wrapper = mount(<App />);
    jest.runAllTimers;
    expect(setTimeout).toHaveBeenCalledTimes(2);
  });
});
