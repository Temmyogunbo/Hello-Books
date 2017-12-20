import React from 'react';
import signInValidation from '../../utils/signInValidation';

describe('Given sign in validation', () => {
  describe('When I want to sign in', () => {
    const fields = {
      userName: '',
      password: 'emmanuel'
    };
    it(
      'Then it should return errors object if password does not match',
      () => {
        const { errors, isValid } = signInValidation(fields);
        expect(errors).toBeDefined();
        expect(errors.userName).toBe('User Name is Required');
        expect(isValid).toBe(false);
      }
    );
  });
});
