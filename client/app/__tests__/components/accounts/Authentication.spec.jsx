import React from 'react';
import { shallow } from 'enzyme';

import { Authentication } from '../../../src/components/accounts/Authentication';

jest.mock('react-router-dom');

describe('Given an Authentication', () => {
  describe('When I want to signin or signup', () => {
    const props = {
      isAuthenticated: false,
      signin: jest.fn(),
      signup: jest.fn(),
      render: jest.fn(),
      history: { replace: jest.fn() }
    };
    const shallowWrapper = shallow(<Authentication {...props} />);

    it('Then it renders a div elements', () => {
      expect(shallowWrapper.find('div').length).toBeGreaterThanOrEqual(2);
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

describe('Given a Sign In Page', () => {
  describe('When I am not authenticated', () => {
    const props = {
      isAuthenticated: true,
      signin: jest.fn(),
      signup: jest.fn(),
      render: jest.fn(),
      history: { replace: jest.fn() }
    };
    const shallowWrapper = shallow(<Authentication {...props} />);
    it('Then it should call the componentWillMount method', () => {
      const componentWillMountSpy = jest.spyOn(
        shallowWrapper.instance(),
        'componentWillMount'
      );
      shallowWrapper.instance().componentWillMount();
      expect(componentWillMountSpy).toHaveBeenCalledTimes(1);
    });
  });
});
