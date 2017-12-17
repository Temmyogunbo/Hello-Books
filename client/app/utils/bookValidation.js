import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

/**It validates books data
 *
 * @param  {object} formData
 *
 * @return {object} object- contains errors and boolean
 */
export default function bookValidation(formData) {
  const errors = {};
  const numberReg = new RegExp('^[0-9]+$');
  if (Validator.isEmpty(formData.title)) {
    errors.title = 'Title is Required';
  }
  if (formData.title.length < 5) {
    errors.description = 'Minimum of 5 characters is required';
  }
  if (Validator.isEmpty(formData.category)) {
    errors.category = 'Category is required';
  }
  if (formData.category.length < 5) {
    errors.category = 'Minimum of 5 characters is required';
  }
  if (Validator.isEmpty(formData.quantity.toString() || formData.quantity)) {
    errors.quantity = 'Quantity is required';
  }
  if (!numberReg.test(formData.quantity)) {
    errors.quantity = 'Quantity must be number';
  }
  if (formData.quantity < 1) {
    errors.quantity = 'Quantity cannot be less than 1';
  }
  if (Validator.isEmpty(formData.author)) {
    errors.author = 'Author is required';
  }
  if (formData.description.length < 10) {
    errors.description = 'Minimum of 10 characters is required';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
}
