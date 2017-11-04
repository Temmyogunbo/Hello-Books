import axios from 'axios';
import {
  ADD_BOOK,
  ADD_BOOK_ERROR
} from '../constants/actionTypes';
/**
 *
 * @param {object} book
 * @return {book} book - dispatched book object
 */
const addBook = book => ({
  type: ADD_BOOK,
  book
});
/**
 *
 * @return {object} error
 * @param {error} error - dispatched error object
 */
const addBookError = error => ({
  type: ADD_BOOK_ERROR,
  error
});

/**
* @return {object} - returns an object of book
* @param {object} bookData - contains book message in the library
*/
const addBookAction = (bookData) => {
  return dispatch =>
    axios.post('api/v1/books', bookData)
      .then((response) => {
        dispatch(addBook(response.data.book));
      })
      .catch((error) => {
        dispatch(addBookError(error.response.data));
        return error;
      });
};

export default addBookAction;
