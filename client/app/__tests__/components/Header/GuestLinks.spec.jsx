import React from 'react';
import { shallow } from 'enzyme';
import GuestLinks from '../../../src/components/Header/GuestLinks';

describe('Given Guestlinks', () => {
  describe('When I am on sign, or sign up, or splashscreen page ', () => {
    const wrapper = shallow(<GuestLinks />);
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
