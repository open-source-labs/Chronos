import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
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
    expect(wrapper).toMatchSnapshot();
  });
});
