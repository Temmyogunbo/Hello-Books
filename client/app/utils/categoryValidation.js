import isEmpty from 'lodash/isEmpty';

/**It validates category data
 *
 * @param  {object} formData
 *
 * @return {object} object- contains errors and boolean
 */
export default function categoryValidation(formData) {
  const errors = {};
  if (formData.category.length < 5) {
    errors.category = 'Category cannot be less than 5 characters';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
}
