import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

/**It validates user data before sending to data
 *
 * @description Validates Sign In form
 *
 * @param  {object} formData
 *
 * @return {object} object- contains errors and boolean
 */
export default function signInValidation(formData) {
  const errors = {};
  if (Validator.isEmpty(formData.userName)) {
    errors.userName = 'User Name is Required';
  }
  if (Validator.isEmpty(formData.password)) {
    errors.password = 'Password is required';
  }
  if (!Validator.isLength(formData.password, { min: 5 })) {
    errors.password = 'Your password is wrong';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
}
