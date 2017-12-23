import React from 'react';
import { shallow } from 'enzyme';

import Welcome from '../../../src/components/Welcome';

describe('Given a Welcome page', () => {
  describe('When the browser opens', () => {
    const wrapper = shallow(<Welcome />);
    it('Then it renders a div elements', () => {
      expect(wrapper.find('div').length).toBeGreaterThanOrEqual(2);
    });
  });
});
