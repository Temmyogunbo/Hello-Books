import React from 'react';
import { shallow } from 'enzyme';

import PageNotFound from '../../../src/components/PageNotFound';


describe('Given Userlinks', () => {
  describe('When the browser opens', () => {
    const wrapper = shallow(<PageNotFound />);
    it('Then it renders an unordered list', () => {
      expect(wrapper.find('div')).toHaveLength(1);
    });

    it('Then it renders Link elements', () => {
      expect(wrapper.find('Link')).toHaveLength(1);
    });
  });
});

