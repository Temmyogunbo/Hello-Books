import React from 'react';
import { shallow } from 'enzyme';

import Button from '../../../src/components/Button';

const props = {
  className: 'active',
  type: 'submit',
  dataAction: 'log-in',
  disabled: false,
  children: '',
  id: 'none',
  onClick: jest.fn(),
  icon: '',
  style: ''
};

describe('Given a Button component', () => {
  describe('When the browser opens', () => {
    const wrapper = shallow(<Button {...props} />);
    it('Then it renders a button element', () => {
      expect(wrapper.find('buton')).toHaveLength(0);
    });
  });
});

