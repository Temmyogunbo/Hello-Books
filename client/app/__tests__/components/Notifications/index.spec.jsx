import React from 'react';
import { shallow } from 'enzyme';

import { Notifications } from
  '../../../src/components/Notifications';

const props = {
  role: '',
  notifications: [],
  getNotifications: jest.fn(),
  updateNotification: jest.fn(),
  total: 0

};

describe('Given Notifcations index', () => {
  describe('When the browser opens', () => {
    const wrapper = shallow(<Notifications {...props} />);
    it('Then it should call the handleChange method', () => {
      const handleChangeSpy = jest.spyOn(wrapper.instance(), 'handleChange');
      wrapper.instance().handleChange(2);
      expect(handleChangeSpy).toHaveBeenCalledTimes(1);
    });
  });
});

