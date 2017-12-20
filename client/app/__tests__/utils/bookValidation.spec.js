import React from 'react';
import bookValidation from '../../utils/bookValidation';

describe('Given book validation', () => {
  describe('When I want to add a book', () => {
    const fields = {
      title: 'Ade',
      category: 'Programming',
      quantity: 'a',
      author: 'Emmy',
      description: 'How Europe underdeveloped Africa'
    };
    it('Then it should return errors object if one or more field is invalid', () => {
      const { errors, isValid } = bookValidation(fields);
      expect(errors).toBeDefined();
      expect(isValid).toBe(false);
    });
    it('Then it should return errors object if quantity field is not a number', () => {
      const { errors, isValid } = bookValidation(fields);
      expect(errors).toBeDefined();
      expect(errors.quantity).toBe('Quantity must be number');
      expect(isValid).toBe(false);
    });
  });
});
