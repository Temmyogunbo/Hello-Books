import React from 'react';
import { shallow } from 'enzyme';

import SignUpForm from '../../../src/components/forms/SignUpForm';

const props = {
  signup: jest.fn()
};


describe('Given a SignUpForm', () => {
  const wrapper = shallow(<SignUpForm {...props} />);
  describe('When I clicked on it', () => {
    it('Then it should call the onSubmit method', () => {
      const event = { ...global.event };
      const onSubmitSpy = jest.spyOn(wrapper.instance(), 'onSubmit');
      wrapper.instance().onSubmit(event);
      expect(onSubmitSpy).toHaveBeenCalledTimes(1);
    });
    it(
      'Then it should call handleClose method when a button is clicked',
      () => {
        const handleCloseSpy = jest.spyOn(wrapper.instance(), 'handleClose');
        wrapper.instance().handleClose();
        expect(handleCloseSpy).toHaveBeenCalledTimes(1);
      }
    );
    it('Then it should call the handleChange method', () => {
      const event = {
        ...global.event,
      };
      const handleChangeSpy = jest.spyOn(wrapper.instance(), 'handleChange');
      wrapper.instance().handleChange(event);
      expect(handleChangeSpy).toHaveBeenCalledTimes(1);
    });
  });
});

