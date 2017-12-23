import React from 'react';
import { shallow, } from 'enzyme';

import Footer from '../../../src/components/Footer';


describe('Given a Footer', () => {
  describe('When the browser opens', () => {
    const wrapper = shallow(<Footer />);
    it('Then it renders a footer elements', () => {
      expect(wrapper.find('footer')).toHaveLength(1);
    });
  });
});

