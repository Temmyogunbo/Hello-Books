import React from 'react';
import { shallow, } from 'enzyme';

import Profile from '../../../src/components/Users/Profile';

const user = {
  fullName: 'fullname',
  userName: 'username',
  email: 'email',
  membership: 'membership',

};

describe('Given  Profile', () => {
  const wrapper = shallow(<Profile user={user} />);
  describe('When the browser opens', () => {
    it('Then it should render without crashing', () => {
      expect(wrapper).toBeDefined();
      expect(wrapper.getElement().type).toBe('div');
      expect(wrapper.find('div').length).toBeGreaterThan(0);
    });
  });
});
