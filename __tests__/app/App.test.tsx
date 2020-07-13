import React from 'react';
<<<<<<< HEAD
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
=======
import { shallow, mount } from 'enzyme';
>>>>>>> master
import App from '../../app/App';

describe('<App />', () => {
  let wrapper: any;

  beforeAll(() => {
    wrapper = shallow(<App />);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
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
