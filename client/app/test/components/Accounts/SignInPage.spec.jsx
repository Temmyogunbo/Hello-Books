import React from 'react';
import { shallow } from 'enzyme';
import { SignInPage } from '../../../src/components/Accounts/SignUpPage';

jest.mock('react-router-dom');

jest.mock('history');

describe('Given a Sign up Page', () => {
  describe('When I am not authenticated', () => {
    const props = {
      isAuthenticated: false,
      history: {},
      Signin: jest.fn()
    };
    const shallowWrapper = shallow(<SignInPage {...props} />);
    //const mountWrapper = mount(<SignUpPage {...props} />);


    it('Then it renders sign in form', () => {
      expect(shallowWrapper.find('SignInForm')).toHaveLength(1);
    });
    // it('Then it has classname image', () => {
    //   expect(shallowWrapper.find('div').at(1).hasClass('image')).toBe(true);
    // });
    // it('Then it should call the componentWillReceiveProps method', () => {
    //   const componentWillReceivePropsSpy = jest.spyOn(shallowWrapper.instance(), 'componentWillReceiveProps');
    //   const nextProps = {
    //     isAuthenticated: false
    //   };
    //   shallowWrapper.instance().componentWillReceiveProps(nextProps);
    //   expect(componentWillReceivePropsSpy).toHaveBeenCalledTimes(1);
    // });
  });
});
