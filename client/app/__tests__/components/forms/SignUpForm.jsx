import React from 'react';
import { shallow } from 'enzyme';

import SignUpForm from '../../../src/components/forms/SignUpForm';

const props = {
  signup: jest.fn()
};

const user = {
  fullName: '34567897654321',
  userName: 'name',
  email: 'email',
  password: 'password',
  confirmPassword: 'password',
};

describe('Given a SignUpForm', () => {
  const wrapper = shallow(<SignUpForm {...props} />);
  describe('When I enter my data', () => {
    it('Then it should call the onSubmit method', () => {
      const event = { ...global.event };
      const onSubmitSpy = jest.spyOn(wrapper.instance(), 'onSubmit');
      wrapper.instance().onSubmit(event);
      expect(onSubmitSpy).toHaveBeenCalledTimes(1);
    });
    it('should call the onGoogleCallback method', () => {
      const onGoogleCallbackOnSpy = jest.spyOn(
        wrapper.instance(),
        'onGoogleCallback'
      );
      wrapper.instance().onGoogleCallback({ profileObj: user });
      expect(onGoogleCallbackOnSpy).toHaveBeenCalledTimes(1);
    });
    it('Then it should call the handleChange method', () => {
      const event = {
        ...global.event,
        target: {
          name: 'name',
          value: 'value',
        }
      };
      const handleChangeSpy = jest.spyOn(wrapper.instance(), 'handleChange');
      wrapper.instance().handleChange(event);
      expect(handleChangeSpy).toHaveBeenCalledTimes(1);
    });
  });
});

