import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

/**It validates user data for password
 *
 * @description Validates password form
 *
 * @param  {object} formData
 *
 * @return {object} object- contains errors and boolean
 */
export default function passwordValidation(formData) {
  const errors = {};
  if (Validator.isEmpty(formData.oldPassword)) {
    errors.oldPassword = 'You must give your old password.';
  }
  if (!Validator.isLength(formData.newPassword, { min: 5 })) {
    errors.newPassword = 'Your pasword is wrong';
  }
  if (Validator.isEmpty(formData.newPassword)) {
    errors.newPassword = 'New password is required';
  }
  if (Validator.isEmpty(formData.confirmNewPassword)) {
    errors.confirmNewPassword = 'You must confirm your new password';
  }
  if (!Validator.equals(formData.newPassword, formData.confirmNewPassword)) {
    errors.confirmNewPassword = 'Passwords must match';
  }
  if (!Validator.isLength(formData.newPassword, { min: 5 })) {
    errors.newPassword = 'Password must be minimum of 5 characters';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
}
