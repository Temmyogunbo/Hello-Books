import React from 'react';
import { shallow } from 'enzyme';
import { SignUpPage } from '../../../src/components/accounts/SignUpPage';

jest.mock('react-router-dom');


describe('Given a Sign up Page', () => {
  describe('When I am not authenticated', () => {
    const props = {
      isAuthenticated: false,
      Signup: jest.fn(),
      history: { replace: jest.fn() }

    };
    const shallowWrapper = shallow(<SignUpPage history={history} {...props} />);


    it('Then it renders sign in form', () => {
      expect(shallowWrapper.find('SignUpForm')).toHaveLength(1);
    });
    it('Then it has classname image', () => {
      expect(shallowWrapper.find('div').at(1).hasClass('image')).toBe(true);
    });
    it('Then it should call the componentWillReceiveProps method', () => {
      const componentWillReceivePropsSpy = jest.spyOn(
        shallowWrapper.instance(),
        'componentWillReceiveProps'
      );
      const nextProps = {
        isAuthenticated: true
      };
      shallowWrapper.instance().componentWillReceiveProps(nextProps);
      expect(componentWillReceivePropsSpy).toHaveBeenCalledTimes(1);
    });
  });
});

describe('Given a Sign up Page', () => {
  describe('When I am not authenticated', () => {
    const props = {
      isAuthenticated: true,
      Signin: jest.fn(),
      history: { replace: jest.fn() }
    };
    const shallowWrapper = shallow(<SignUpPage {...props} />);
    it('Then it should call the componentWillMount method', () => {
      const componentWillMountSpy = jest.spyOn(shallowWrapper.instance(), 'componentWillMount');
      shallowWrapper.instance().componentWillMount();
      expect(componentWillMountSpy).toHaveBeenCalledTimes(1);
    });
  });
});