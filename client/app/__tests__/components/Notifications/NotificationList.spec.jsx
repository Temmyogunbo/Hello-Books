import React from 'react';
import { shallow, } from 'enzyme';

import NotificationList from
  '../../../src/components/Notifications/NotificationList';

const props = {
  notifications: {},
  updateNotification: jest.fn(),
};

describe('Given a NotifcationList', () => {
  describe('When the browser opens', () => {
    const wrapper = shallow(<NotificationList {...props} />);
    it('Then it renders a div elements', () => {
      expect(wrapper.find('div')).toHaveLength(1);
    });
  });
});

