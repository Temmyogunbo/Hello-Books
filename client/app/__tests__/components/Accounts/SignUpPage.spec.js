import React from 'react';
import { shallow } from 'enzyme';
import { SignUpPage } from '../../../src/components/accounts/SignUpPage';

jest.mock('react-router-dom');

jest.mock('history');
console.log('hey man')
describe('Given a Sign up Page', () => {
  describe('When I am not authenticated', () => {
    const props = {
      isAuthenticated: false,
      history: {},
      Signup: jest.fn()
    };
    const shallowWrapper = shallow(<SignUpPage {...props} />);
    //const mountWrapper = mount(<SignUpPage {...props} />);


    it('Then it renders sign in form', () => {
      expect(shallowWrapper.find('SignUpForm')).toHaveLength(1);
    });
    it('Then it has classname image', () => {
      expect(shallowWrapper.find('div').at(1).hasClass('image')).toBe(true);
    });
    it('Then it should call the componentWillReceiveProps method', () => {
      const componentWillReceivePropsSpy = jest.spyOn(shallowWrapper.instance(), 'componentWillReceiveProps');
      const nextProps = {
        isAuthenticated: false
      };
      shallowWrapper.instance().componentWillReceiveProps(nextProps);
      expect(componentWillReceivePropsSpy).toHaveBeenCalledTimes(1);
    });
  });
});
