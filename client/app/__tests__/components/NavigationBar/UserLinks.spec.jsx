import React from 'react';
import { shallow } from 'enzyme';
import UserLinks from '../../../src/components/NavigationBar/UserLinks';


describe('Given Userlinks', () => {
  const props = {
    isAdmin: true,
    signOutAction: jest.fn()
  };
  describe('When the browser opens', () => {
    const wrapper = shallow(<UserLinks {...props} />);
    //const wrapper2 = mount(<UserLinks {...props} />);
    it('Then it renders an unordered list', () => {
      expect(wrapper.find('ul')).toHaveLength(2);
    });
    it('Then it renders list items', () => {
      expect(wrapper.find('li').length).toBeGreaterThanOrEqual(1);
    });
    it('Then it renders Link elements', () => {
      expect(wrapper.find('Link')).toHaveLength(4);
    });
  });
});

describe('Given Userlinks', () => {
  const props = {
    isAdmin: false,
    signOutAction: jest.fn()
  };
  describe('When the browser opens', () => {
    const wrapper = shallow(<UserLinks {...props} />);
    it('Then it renders list items', () => {
      expect(wrapper.find('li').length).toBeGreaterThanOrEqual(1);
    });
    it('Then it renders Link elements', () => {
      expect(wrapper.find('Link')).toHaveLength(6);
    });
  });
});
