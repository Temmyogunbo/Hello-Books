import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

/**
 * @description Validates Sign In form
 * @param  {object} formData
 * @return {object} object- contains errors and boolean
 */
export default function bookValidation(formData) {
  console.log("here is ", formData.quantity)
  const errors = {};
  const numberReg = new RegExp('^[0-9]+$');
  if (Validator.isEmpty(formData.title)) {
    errors.title = 'Title is Required';
  }
  if (Validator.isEmpty(formData.category)) {
    errors.category = 'Category is required';
  }
  if (Validator.isEmpty(formData.quantity.toString() || formData.quantity)) {
    errors.quantity = 'Quantity is required';
  }
  if (!numberReg.test(formData.quantity)) {
    errors.quantity = 'Quantity must be number';
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