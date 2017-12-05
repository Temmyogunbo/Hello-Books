import React from 'react';
import { shallow } from 'enzyme';
import UserLinks from '../../../src/components/Header/UserLinks';


const props = {
  isAdmin: true,
  signOutAction: jest.fn()
};

describe('Userlinks', () => {
  const wrapper = shallow(<UserLinks {...props} />);
  it('renders an unordered list', () => {
    //console.log(a.debug());
    expect(wrapper.find('ul')).toHaveLength(2);
  });
  it('renders list items', () => {
    expect(wrapper.find('li').length).toBeGreaterThanOrEqual(1);
  });
});
