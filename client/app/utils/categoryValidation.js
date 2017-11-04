import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

/**
 * @description Validates Sign In form
 * @param  {object} formData
 * @return {object} object- contains errors and boolean
 */
export default function categoryValidation(formData) {
  const errors = {};
  if (Validator.isEmpty(formData.category)) {
    errors.title = 'Category is Required';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
}
