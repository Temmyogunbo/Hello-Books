import React from 'react';
import { shallow } from 'enzyme';

import { BookCategories } from '../../../../src/components/Collections/BookCategories';
//import { book2 } from '../../../__mocks__/mockData';

const props = {
  category: [],
  getBookCategory: jest.fn(),
  getAllBooksByCategory: jest.fn(),
  itemsCountPerPage: 5,
  currentPage: 1,

};

describe('Given  BookCategories', () => {
  const wrapper = shallow(<BookCategories {...props} />);
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
        category: [{
          id: 9,
          category: "Mechanics",
          createdAt: "2017-12-14T17:02:12.868Z",
          updatedAt: "2017-12-14T17:02:12.868Z"
        }]
      };
      wrapper.instance().componentWillReceiveProps(nextProps);
      expect(componentWillReceivePropsSpy).toHaveBeenCalledTimes(1);
    });
  });
});

