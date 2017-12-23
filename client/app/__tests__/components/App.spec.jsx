
import React from 'react';
import { shallow } from 'enzyme';
import Routes from '../../src/components/App';

jest.mock('react-router');


describe('Given App component', () => {
  describe('When the browser opens', () => {
    const wrapper = shallow(<Routes />);
    it('Then should render application routes', () => {
      expect(wrapper).toBeDefined();
    });
  });
});

describe('Given App components', () => {
  describe('Routes component', () => {
    const wrapper = shallow(<Routes />);
    it('should render self and subcomponents', () => {
      expect(wrapper.find('Switch').exists()).toBe(true);
      expect(wrapper.find('Route').exists()).toBe(true);
    });
  });
});
