import React from 'react';
import { shallow } from 'enzyme';

import CardList from '../../../../src/components/Collections/CardLayout';

const props = {
  books: [{}],
  role: 'users',
  handleDelete: jest.fn(),
  handleEdit: jest.fn()
};


describe('Given Userlinks', () => {
  describe('When the browser opens', () => {
    const wrapper = shallow(<CardList {...props} />);
    it('Then it renders an unordered list', () => {
      expect(wrapper.find('ul')).toHaveLength(1);
    });
    it('Then it renders list items', () => {
      expect(wrapper.find('li').length).toBeGreaterThanOrEqual(1);
    });
    it('Then it renders Link elements', () => {
      expect(wrapper.find('Link')).toHaveLength(1);
    });
  });
});

