import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

/**It validates user data before sending to server
 *
 * @description Validates Sign Up form data
 *
 * @param  {object} formData - form data object
 *
 * @return {object} object- contains error and boolean
 */
export default function signUpValidation(formData) {
  const errors = {};
  if (Validator.isEmpty(formData.fullName)) {
    errors.fullName = 'Full Name is Required';
  }
  if (Validator.isEmpty(formData.userName)) {
    errors.userName = 'User Name is Required';
  }
  if (!Validator.isEmail(formData.email)) {
    errors.email = 'Email is invalid';
  }
  if (Validator.isEmpty(formData.password)) {
    errors.password = 'Password is Required';
  }
  if (Validator.isEmpty(formData.confirmPassword)) {
    errors.confirmPassword = 'You need to confirm your password.';
  }
  if (!Validator.equals(formData.password, formData.confirmPassword)) {
    errors.confirmPassword = 'Passwords must match';
  }
  if (!Validator.isLength(formData.password, { min: 5, max: 50 })) {
    errors.password = 'Password must be minimum of 5 characters';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
}
