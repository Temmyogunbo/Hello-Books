import React from 'react';
import { shallow, } from 'enzyme';

import Pagination from '../../../src/components/Pagination';

const props = {
  activePage: 1,
  itemsCountPerPage: 5,
  pageRangeDisplayed: 5,
  totalItemsCount: 5,
  handlePageChange: jest.fn(),
};

describe('Given Pagination', () => {
  describe('When the browser opens', () => {
    const wrapper = shallow(<Pagination {...props} />);
    it('Then it renders a div element', () => {
      expect(wrapper.find('div')).toHaveLength(1);
    });
  });
});

