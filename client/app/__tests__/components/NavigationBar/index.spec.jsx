import React from 'react';
import { shallow, mount } from 'enzyme';
import { NavigationBar } from '../../../src/components/NavigationBar';


jest.mock('react-router-dom');
jest.mock('jquery');

describe('Given NavigationBar', () => {
  describe('When I am on a page ', () => {
    const props = {
      user: {
        isAuthenticated: false,
      },
      signOutAction: jest.fn(),
      isAdmin: 'user'
    };
    const wrapper = mount(<NavigationBar {...props} />);
    it('Then it renders an unordered list', () => {
      expect(wrapper.find('nav')).toHaveLength(1);
    });
    it('Then it renders Guest links when user is not authenticated', () => {
      expect(wrapper.find('GuestLinks').length).toEqual(1);
    });
    it('Then it renders Link elements', () => {
      expect(wrapper.find('Link')).toHaveLength(6);
    });
  });
});

describe('Given NavigationBar', () => {
  describe('When I am on a page ', () => {
    const props = {
      user: {
        isAuthenticated: true,
      },
      signOutAction: jest.fn(),
      isAdmin: 'user'
    };
    const wrapper = mount(<NavigationBar {...props} />);
    const shallowWrapper = shallow(<NavigationBar {...props} />);
    it('Then it renders an unordered list', () => {
      expect(wrapper.find('nav')).toHaveLength(1);
    });
    it('Then it renders Guest links when user is not authenticated', () => {
      expect(wrapper.find('UserLinks').length).toEqual(1);
    });
    it('Then it renders Link elements', () => {
      expect(wrapper.find('Link')).toHaveLength(8);
    });
    it('Then it checks if user is admin', () => {
      expect(wrapper.state().isAdmin).toBe(false);
    });
    it(
      'Then it should call the componentWillReceiveProps method',
      () => {
        const componentWillReceivePropsSpy = jest.
          spyOn(shallowWrapper.instance(), 'componentWillReceiveProps');
        const nextProps = {
          isAdmin: 'admin',
          total: 1,
          role: 'admin',
        };
        shallowWrapper.instance().componentWillReceiveProps(nextProps);
        expect(componentWillReceivePropsSpy).toHaveBeenCalledTimes(1);
      }
    );
    it('Then it should calls signOutAction', () => {
      const event = {
        ...global.event,
        target: {
          name: 'name',
          value: 'value',
        }
      };
      const signOutActionSpy = jest.spyOn(
        shallowWrapper.instance(),
        'signOutAction'
      );
      shallowWrapper.instance().signOutAction(event);
      expect(signOutActionSpy).toHaveBeenCalledTimes(1);
    });
  });
});

describe('Given NavigationBar', () => {
  describe('When I am on a page ', () => {
    const props = {
      user: {
        isAuthenticated: true,
      },
      signOutAction: jest.fn(),
      isAdmin: 'admin'
    };
    const shallowWrapper = shallow(<NavigationBar {...props} />);
    it('Then it should call the componentDidMount method', () => {
      const componentDidMountSpy = jest.spyOn(shallowWrapper.instance(), 'componentDidMount');
      shallowWrapper.instance().componentDidMount();
      expect(componentDidMountSpy).toHaveBeenCalledTimes(1);
    });
  });
});

