import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

/**It validates category data
 * 
 * @param  {object} formData
 * 
 * @return {object} object- contains errors and boolean
 */
export default function categoryValidation(formData) {
  const errors = {};
  if (Validator.isEmpty(formData.category)) {
    errors.category = 'Category is Required';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
}
