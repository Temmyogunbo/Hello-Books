import React from 'react';
import { shallow } from 'enzyme';

import BookPage from '../../../../src/components/Collections/BookPage';
import { book2 } from '../../../__mocks__/mockData';

const props = {
  books: {},
  user: {},
  items: [{ id: 1, category: 'English' }, { id: 2, category: 'mathematics' }],
  getBook: jest.fn(),
  borrowBook: jest.fn(),
  role: 'users'
};

describe('Given a BookPage', () => {
  const wrapper = shallow(<BookPage {...props} />);
  describe('When the browser opens', () => {
    it('Then it should render without crashing', () => {
      expect(wrapper).toBeDefined();
      expect(wrapper.getElement().type).toBe('div');
      expect(wrapper.find('div').length).toBeGreaterThan(0);
    });
    // it('Then it should call the componentWillReceiveProps method', () => {
    //   const componentWillReceivePropsSpy = jest.spyOn(
    //     wrapper.instance(),
    //     'componentWillReceiveProps'
    //   );
    //   const nextProps = {
    //     books: book2
    //   };
    //   console.log(wrapper.debug())
    //   wrapper.instance().componentWillReceiveProps(nextProps);
    //   expect(componentWillReceivePropsSpy).toHaveBeenCalledTimes(1);
    // });
  });
});
