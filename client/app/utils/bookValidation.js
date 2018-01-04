import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

/**It validates books data
 *
 * @param  {object} formData - form data object
 *
 * @return {object} object- contains errors and boolean
 */
export default function bookValidation(formData) {
  const errors = {};
  const numberReg = new RegExp('^[0-9]+$');
  if (Validator.isEmpty(formData.title)) {
    errors.title = 'Title is Required';
  }
  if (formData.title.length < 2) {
    errors.title = 'Title cannot be less than 2 characters';
  }
  if (formData.category.length < 5) {
    errors.category = 'Category cannot be less than 5 characters';
  }
  if (!numberReg.test(formData.quantity)) {
    errors.quantity = 'Quantity must be number';
  }
  if (formData.quantity < 1) {
    errors.quantity = 'Quantity cannot be less than 1';
  }
  if (formData.author.length < 2) {
    errors.author = 'Author name cannot be less than 2 characters';
  }
  if (formData.description.length < 10) {
    errors.description = 'Description cannot be less than 10 characters';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
}
