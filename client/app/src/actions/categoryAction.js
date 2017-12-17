import axios from 'axios';
import toastr from 'toastr';

import {
  CREATE_BOOK_CATEGORY,
  GET_BOOK_CATEGORY,
} from '../constants/actionTypes';

/**Dispatched category action
 *
 * @param {object} category
 *
 * @return {book} category - dispatched category object
 */
const createBookCategory = category => ({
  type: CREATE_BOOK_CATEGORY,
  category
});

/**Dispatched category action
 *
 * @param {object} category
 *
 * @return {object} category - dispatched category object
 */
const getBookCategory = category => ({
  type: GET_BOOK_CATEGORY,
  category
});


/**It returns category object
 *
 *  @return {object} - returns an object of category
*/
export const getBookCategoryAction = () => dispatch =>
  axios.get('/api/v1/category')
    .then((response) => {
      dispatch(getBookCategory(response.data));
    })
    .catch((error) => {
      toastr.error(error.response.data);
      return error;
    });

/**It returns created category object
 *
* @return {object} - returns an object of category

* @param {object} categoryData - contains      categoryin the library
*/
export const createBookCategoryAction =
categoryData => dispatch => axios.post('/api/v1/category', categoryData)
  .then((response) => {
    dispatch(createBookCategory(response.data.category));
    toastr.success('You added a category');
  })
  .catch((error) => {
    toastr.error(error.response.data.errors[0].msg.message);
  });
export default {
  createBookCategoryAction,
  getBookCategoryAction
};
