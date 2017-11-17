import axios from 'axios';
import toastr from 'toastr';
import {
  CREATE_BOOK_CATEGORY,
  CREATE_BOOK_CATEGORY_ERROR,
  GET_BOOK_CATEGORY,
  GET_BOOK_CATEGORY_ERROR
} from '../constants/actionTypes';
/**
 *
 * @param {object} category
 * @return {book} category - dispatched category object
 */
const createBookCategory = category => ({
  type: CREATE_BOOK_CATEGORY,
  category
});
/**
 *
 * @return {object} error
 * @param {error} error - dispatched error object
 */
const createBookCategoryError = error => ({
  type: CREATE_BOOK_CATEGORY_ERROR,
  error
});
/**
 *
 * @param {object} category
 * @return {object} category - dispatched category object
 */
const getBookCategory = category => ({
  type: GET_BOOK_CATEGORY,
  category
});
/**
 *
 * @param {object} error
 * @return {object} error - dispatched error object
 */
const getBookCategoryError = error => ({
  type: GET_BOOK_CATEGORY_ERROR,
  error
});

/**
 *  @return {object} - returns an object of category
*/
export const getBookCategoryAction = () => dispatch =>
  axios.get('api/v1/category')
    .then((response) => {
      dispatch(getBookCategory(response.data));
    })
    .catch((error) => {
      dispatch(getBookCategoryError(error.response.data));
      return error;
    });

/**
* @return {object} - returns an object of category
* @param {object} categoryData - contains      categoryin the library
*/
export const createBookCategoryAction =
categoryData => dispatch => axios.post('api/v1/category', categoryData)
  .then((response) => {
    dispatch(createBookCategory(response.data.category));
    toastr.success('You added a category');
  })
  .catch((error) => {
    dispatch(createBookCategoryError(error.response.data));
    toastr.error(error.response.data.msg);
  });
