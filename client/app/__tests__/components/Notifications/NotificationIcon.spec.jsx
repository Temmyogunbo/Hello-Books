import React from 'react';
import { shallow } from 'enzyme';

import NotificationIcon from
  '../../../src/components/Notifications/NotificationIcon';

const props = {
  total: 1
};
describe('Given a NotifcationIcon', () => {
  describe('When the browser opens', () => {
    const wrapper = shallow(<NotificationIcon {...props} />);
    it('Then it renders a Link elements', () => {
      expect(wrapper.find('Link')).toHaveLength(1);
    });
  });
});

