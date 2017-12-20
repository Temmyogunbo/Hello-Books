import React from 'react';
import passwordValidation from '../../utils/passwordValidation';

describe('Given password validation', () => {
  describe('When I want to change my password', () => {
    const fields = {
      oldPassword: 'emm',
      newPassword: 'emmanuel',
      confirmNewPassword: 'emmanuel'
    };
    it(
      'Then it should return errors object if one or more field is invalid',
      () => {
        const { errors, isValid } = passwordValidation(fields);
        expect(errors).toBeDefined();
        expect(isValid).toBe(false);
      }
    );
    it(
      'Then it should return errors object if oldPassword field is less than 5',
      () => {
        const { errors, isValid } = passwordValidation(fields);
        expect(errors).toBeDefined();
        expect(errors.oldPassword).toBe('Your pasword is wrong');
        expect(isValid).toBe(false);
      }
    );
    it(
      'Then it should return errors object if password does not match',
      () => {
        const newFields = {
          oldPassword: 'emmmanuel',
          newPassword: 'emmanuellllll',
          confirmNewPassword: 'emmanuel'
        };
        const { errors, isValid } = passwordValidation(newFields);
        expect(errors).toBeDefined();
        expect(errors.confirmNewPassword).toBe('Passwords must match');
        expect(isValid).toBe(false);
      }
    );
  });
});
