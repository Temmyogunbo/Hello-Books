import React from 'react';
import { shallow } from 'enzyme';

import { Users } from '../../../src/components/Users';

const props = {
  getHistory: jest.fn(),
  changePassword: jest.fn(),
  user: {},
  total: 0,
  userHistoryReducer: [],
  returnBook: jest.fn(),

};

describe('Given  a Users', () => {
  const wrapper = shallow(<Users {...props} />);
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
            CB: jest.fn(),
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
          value: 'value',
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


describe('Given  a Users', () => {
  const wrapper = shallow(<Users {...props} />);
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
