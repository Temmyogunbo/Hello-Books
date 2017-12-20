import React from 'react';
import { shallow } from 'enzyme';

import { Notifications } from
  '../../../src/components/Notifications';

const props = {
  role: 'users',
  notifications: [{
    id: 277,
    notificationType: "BOOK_RETURNED",
    seen: "unread",
    updatedAt: "2017-12-19T06:09:42.294Z",
    Book: {
      author: "Segun Olaiya",
      title: "Community health"
    },
    User: {
      userName: "ojeah"
    }

  }],
  getNotifications: jest.fn(),
  updateNotification: jest.fn(),
  total: 0
};

describe('Given Notifcations', () => {
  describe('When the browser opens', () => {
    const wrapper = shallow(<Notifications {...props} />);
    it('Then it should call the handleChange method', () => {
      const handlePageChangeSpy = jest.spyOn(wrapper.instance(), 'handlePageChange');
      wrapper.instance().handlePageChange(2);
      expect(handlePageChangeSpy).toHaveBeenCalledTimes(1);
    });
  });
});

