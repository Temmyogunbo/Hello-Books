import React from 'react';
import { shallow } from 'enzyme';

import UserRecords from '../../../src/components/Users/UserRecords';

const props = {
  userHistory: [{
    BookId: 89,
    dueDate: "2017-12-27T05:49:55.331Z",
    borrowedDate: "2017-12-19T05:49:55.331Z",
    returned: false,
    Book: {
      author: "Akinkugbe",
      title: "Intestine"
    }
  }],
  handleReturnBook: jest.fn(),
  getHistory: jest.fn(),
  returnBook: jest.fn(),
  activePage: 1,
  itemsCountPerPage: 5,
  userId: 1
};

describe('Given  UserRecords', () => {
  const wrapper = shallow(<UserRecords {...props} />);
  describe('When the browser opens', () => {
    it('Then it should render without crashing', () => {
      expect(wrapper).toBeDefined();
      expect(wrapper.getElement().type).toBe('div');
      expect(wrapper.find('div').length).toBeGreaterThan(0);
    });
  });
});
