import React from 'react';
import { shallow, mount } from 'enzyme';
import BookForm from '../../../src/components/Forms/BookForm';

const props = {
  label: 'category',
  field: 'category',
  items: [{ id: 1, category: 'English' }, { id: 2, category: 'mathematics' }],
  handleChange: jest.fn(),
  value: 'category',
  book: {},
  editBook: jest.fn(),
  addBook: jest.fn(),
  categories: [{ id: 1, category: 'English' },
    { id: 2, category: 'mathematics' }],
  error: ''
};

describe('Given a BookForm', () => {
  describe('When I clicked on it', () => {
    it('Then it should render without crashing', () => {
      const wrapper = shallow(<BookForm {...props} />);
      expect(wrapper).toBeDefined();
      expect(wrapper.getElement().type).toBe('div');
      expect(wrapper.find('div').length).toBeGreaterThan(0);
    });
    it('Then it should have a TextFieldGroup', () => {
      const wrapper = shallow(<BookForm {...props} />);
      expect(wrapper.find('TextFieldGroup').length).toBe(4);
    });
    it('Then it should have a SelectInputField', () => {
      const wrapper = shallow(<BookForm {...props} />);
      expect(wrapper.find('SelectInputField').length).toBe(1);
    });
  });
});
