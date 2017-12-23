import React from 'react';
import categoryValidation from '../../utils/categoryValidation';

describe('Given category validation', () => {
  describe('When I want to add a book', () => {
    const fields = {
      category: ''
    };
    it(
      'Then it should return errors object if one or more field is invalid',
      () => {
        const { errors, isValid } = categoryValidation(fields);
        expect(errors).toBeDefined();
        expect(isValid).toBe(false);
      }
    );
    it(
      'Then it should return errors object if category field is not a number',
      () => {
        const { errors, isValid } = categoryValidation(fields);
        expect(errors).toBeDefined();
        expect(errors.category).toBe('Category cannot be less than 3 characters');
        expect(isValid).toBe(false);
      }
    );
  });
});
