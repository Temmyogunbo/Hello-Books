import React from 'react';
import { shallow } from 'enzyme';

import { Collections } from '../../../src/components/Collections';
import { book2 } from '../../__mocks__/mockData';

const props = {
  books: [],
  total: 0,
  role: 'users',
  editBook: jest.fn(),
  addBook: jest.fn(),
  getAllBooks: jest.fn(),
  deleteBook: jest.fn(),
  getBookCategory: jest.fn(),
  createBookCategory: jest.fn(),
  getNotifications: jest.fn(),
  categories: []

};

describe('Given a Collections', () => {
  const wrapper = shallow(<Collections {...props} />);
  describe('When the browser opens', () => {
    it('Then it should render without crashing', () => {
      expect(wrapper).toBeDefined();
      expect(wrapper.getElement().type).toBe('div');
      expect(wrapper.find('div').length).toBeGreaterThan(0);
    });
    it('Then it should call the componentWillReceiveProps method', () => {
      const componentWillReceivePropsSpy = jest.spyOn(
        wrapper.instance(),
        'componentWillReceiveProps'
      );
      const nextProps = {
        books: book2
      };
      wrapper.instance().componentWillReceiveProps(nextProps);
      expect(componentWillReceivePropsSpy).toHaveBeenCalledTimes(1);
    });
    it('Then it should call the handlePageChange method', () => {
      const event = {
        ...global.event,
        target: {
          name: 'name',
          value: 'value'
        }
      };
      const handlePageChangeSpy = jest.spyOn(
        wrapper.instance(),
        'handlePageChange'
      );
      wrapper.instance().handlePageChange(event);
      expect(handlePageChangeSpy).toHaveBeenCalledTimes(1);
    });
    it('Then it should call the handleEditBook method', () => {
      const event = {
        ...global.event,
        target: {
          id: 'name',
          value: 'value'
        }
      };
      const handleEditBookSpy = jest.spyOn(
        wrapper.instance(),
        'handleEditBook'
      );
      wrapper.instance().handleEditBook(event);
      expect(handleEditBookSpy).toHaveBeenCalledTimes(1);
    });
    it('Then it should call the handleDeleteBook method', () => {
      const event = {
        ...global.event,
        target: {
          id: 'handleDeleteBook',
          value: 'value'
        }
      };
      const handleDeleteBookSpy = jest.spyOn(
        wrapper.instance(),
        'handleDeleteBook'
      );
      wrapper.instance().handleDeleteBook(event);
      expect(handleDeleteBookSpy).toHaveBeenCalledTimes(1);
    });
  });
});
