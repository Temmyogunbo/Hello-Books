import React from 'react';
import signUpValidation from '../../utils/signUpValidation';

describe('Given sign up validation', () => {
  describe('When I want to sign up for an account', () => {
    const fields = {
      fullName: 'emmanuel',
      userName: 'emmanuel',
      password: 'emmanuel',
      confirmPassword: 'emwmbdgeuhehds',
      email: 'emmanuel@gmail.com'
    };
    it(
      'Then it should return errors object if one or more field is invalid',
      () => {
        const { errors, isValid } = signUpValidation(fields);
        expect(errors).toBeDefined();
        expect(isValid).toBe(false);
      }
    );
    it(
      'Then it should return errors object if password does not match',
      () => {
        const { errors, isValid } = signUpValidation(fields);
        expect(errors).toBeDefined();
        expect(errors.confirmPassword).toBe('Passwords must match');
        expect(isValid).toBe(false);
      }
    );
  });
});
