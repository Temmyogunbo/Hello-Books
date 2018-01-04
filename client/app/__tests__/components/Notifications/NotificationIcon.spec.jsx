import React from 'react';
import { shallow } from 'enzyme';

import NotificationIcon from
  '../../../src/components/Notifications/NotificationIcon';


describe('Given a NotifcationIcon', () => {
  describe('When the browser opens', () => {
    const props = {
      total: 1
    };
    const wrapper = shallow(<NotificationIcon {...props} />);
    it('Then it renders a Link elements', () => {
      expect(wrapper.find('Link')).toHaveLength(1);
    });
  });
});

describe('Given a NotifcationIcon', () => {
  describe('When the browser opens', () => {
    const props = {
      total: 0
    };
    const wrapper = shallow(<NotificationIcon {...props} />);
    it('Then it renders null if no notification', () => {
      expect(wrapper.find('h6')).toHaveLength(1);
    });
  });
});
