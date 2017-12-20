import React from 'react';
import { shallow } from 'enzyme';

import { HistoryPage } from '../../../src/components/users/HistoryPage';
//import { book2 } from '../../__mocks__/mockData';

const props = {
  getHistory: jest.fn(),
  changePassword: jest.fn(),
  user: {},
  total: 0,
  userHistoryReducer: [],
  returnBook: jest.fn()

};

describe('Given  a HistoryPage', () => {
  const wrapper = shallow(<HistoryPage {...props} />);
  describe('When the browser opens', () => {
    it('Then it should render without crashing', () => {
      expect(wrapper).toBeDefined();
      expect(wrapper.getElement().type).toBe('div');
      expect(wrapper.find('div').length).toBeGreaterThan(0);
    });
    it('Then it should call the componentDidMount method', () => {
      const componentDidMountSpy = jest.spyOn(
        wrapper.instance(),
        'componentDidMount'
      );
      wrapper.instance().componentDidMount();
      expect(componentDidMountSpy).toHaveBeenCalledTimes(1);
    });
    it(
      'Then it should call the handleReturnBook when returned is false',
      () => {
        const data = {
          historyObj: {
            returned: false,
            id: 1,
            CB: jest.fn()
          }
        };
        const handleReturnBookSpy = jest.spyOn(
          wrapper.instance(),
          'handleReturnBook'
        );
        wrapper.instance().handleReturnBook(data);
        expect(handleReturnBookSpy).toHaveBeenCalledTimes(1);
      }
    );
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
  });
});


describe('Given  a HistoryPage', () => {
  const props = {
    getHistory: jest.fn(),
    changePassword: jest.fn(),
    user: { role: 'admin' },
    total: 0,
    userHistoryReducer: [],
    returnBook: jest.fn()

  };
  const wrapper = shallow(<HistoryPage {...props} />);
  describe('When the browser opens', () => {
    it('Then it should call the componentWilMount method', () => {
      const componentWillMountSpy = jest.spyOn(
        wrapper.instance(),
        'componentWillMount'
      );
      wrapper.instance().componentWillMount();
      expect(componentWillMountSpy).toHaveBeenCalledTimes(1);
    });
  });
});


describe('Given  a HistoryPage', () => {
  const wrapper = shallow(<HistoryPage {...props} />);
  describe('When the browser opens', () => {
    it(
      'Then it should call the handleReturnBook when returned is true',
      () => {
        const data = {
          historyObj: {
            returned: true,
            id: 1,
            CB: jest.fn()
          }
        };
        const handleReturnBookSpy = jest.spyOn(
          wrapper.instance(),
          'handleReturnBook'
        );
        wrapper.instance().handleReturnBook(data);
        expect(handleReturnBookSpy).toHaveBeenCalledTimes(1);
      }
    );

  });
});