import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import validateFileUpload from './validateFileUpload';

/**
 * @description Validates Sign In form
 * @param  {object} formData
 * @return {object} object- contains errors and boolean
 */
export default function addBookValidation(formData) {
  const errors = {};
  if (Validator.isEmpty(formData.title)) {
    errors.title = 'Title is Required';
  }
  if (Validator.isEmpty(formData.category)) {
    errors.category = 'Category is required';
  }
  if (Validator.isEmpty(formData.quantity)) {
    errors.quantity = 'Quantity is required';
  }
  if (typeof Number(formData.quantity) !== 'number') {
    errors.quantity = 'Quantity must be number';
  }
  if (Validator.isEmpty(formData.author)) {
    errors.author = 'Author is required';
  }
  if (validateFileUpload(formData.imageUrl)) {
    errors.imageUrl = 'Please provide an image to be uploaded';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
}
