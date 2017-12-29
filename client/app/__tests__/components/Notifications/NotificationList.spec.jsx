import React from 'react';
import { shallow, } from 'enzyme';

import NotificationList from
  '../../../src/components/Notifications/NotificationList';


describe('Given a NotifcationList', () => {
  const props = {
    notifications: [],
    updateNotification: jest.fn(),
  };
  describe('When the browser opens', () => {
    const wrapper = shallow(<NotificationList {...props} />);
    it('Then it renders a div elements', () => {
      expect(wrapper.find('div')).toHaveLength(1);
    });
  });
});

describe('Given a NotifcationList', () => {
  const props = {
    notifications: [{
      notificationType: "BOOK_RETURNED",
      seen: "unread",
      updatedAt: "2017-12-27T21:26:24.562Z",
      Book: {
        author: "Edward Luttwark",
        title: "The Mummies",
      },
      User: {
        userName: "temmy",
      }

    }],
    updateNotification: jest.fn(),
  };
  describe('When the browser opens', () => {
    const wrapper = shallow(<NotificationList {...props} />);
    it('Then it renders a div elements containing notifcations', () => {
      expect(wrapper.find('ul')).toHaveLength(1);
    });
  });
});

describe('Given a NotifcationList', () => {
  const props = {
    notifications: [{
      notificationType: "BOOK_BORROWED",
      seen: "unread",
      updatedAt: "2017-12-27T21:26:24.562Z",
      Book: {
        author: "Edward Luttwark",
        title: "The Mummies",
      },
      User: {
        userName: "temmy",
      }

    }],
    updateNotification: jest.fn(),
  };
  describe('When the browser opens', () => {
    const wrapper = shallow(<NotificationList {...props} />);
    it(
      'Then it renders a div element where notification type is borrowed',
      () => {
        expect(wrapper.find('ul')).toHaveLength(1);
      }
    );
  });
});
