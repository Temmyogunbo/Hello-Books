import isEmpty from 'lodash/isEmpty';

/**It validates category data
 *
 * @param  {object} formData - form data object
 *
 * @return {object} object- contains errors and boolean
 */
export default function categoryValidation(formData) {
  const errors = {};
  if (formData.category.length < 3) {
    errors.category = 'Category cannot be less than 3 characters';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
}
