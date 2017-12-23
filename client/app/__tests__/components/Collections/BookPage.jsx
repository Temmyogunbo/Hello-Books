import React from 'react';
import { shallow } from 'enzyme';

import { BookPage } from '../../../src/components/Collections/BookPage';
import { secondBookSample } from '../../__mocks__/mockData';

const props = {
  books: {},
  user: {},
  items: [{ id: 1, category: 'English' }, { id: 2, category: 'mathematics' }],
  getBook: jest.fn(),
  borrowBook: jest.fn(),
  role: 'users',
  match: { params: { bookId: 1 } },
};

describe('Given a BookPage', () => {
  const wrapper = shallow(<BookPage {...props} />);
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
        books: secondBookSample,
      };
      wrapper.instance().componentWillReceiveProps(nextProps);
      expect(componentWillReceivePropsSpy).toHaveBeenCalledTimes(1);
    });
    it('Then it should call the handleBorrowBook method', () => {
      const handleBorrowBookSpy = jest.spyOn(
        wrapper.instance(),
        'handleBorrowBook'
      );
      wrapper.instance().handleBorrowBook();
      expect(handleBorrowBookSpy).toHaveBeenCalledTimes(1);
    });
  });
});
