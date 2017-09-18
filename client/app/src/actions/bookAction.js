import axios from 'axios';
import {
  GET_ALL_BOOKS,
  GET_ALL_BOOKS_ERROR,
  BORROW_A_BOOK,
  BORROW_A_BOOK_ERROR,
  GET_USER_HISTORY,
  GET_USER_HISTORY_ERROR
} from '../constants/actionTypes';

/**
 *
 * @return {object} All books
 * @param {error} books - dispatched book object
 */
const getAllBooks = books => ({
  type: GET_ALL_BOOKS,
  books
});
/**
 *
 * @return {object} error
 * @param {error} error - dispatched error object
 */
const getAllBooksError = error => ({
  type: GET_ALL_BOOKS_ERROR,
  error
});
/**
 *
 * @return {object} All books
 * @param {error} books - dispatched book object
 */
const borrowBook = book => ({
  type: BORROW_A_BOOK,
  book
});

const borrowBookError = error => ({
  type: BORROW_A_BOOK_ERROR,
  error
});
/**
 *
 * @return {object} All history
 * @param {error} history - dispatched history object
 */
const getHistory = history => ({
  type: GET_USER_HISTORY,
  history
});
/**
 *
 * @return {object} error
 * @param {error} error - dispatched error object
 */
const getHistoryError  = error => ({
  type: GET_USER_HISTORY_ERROR,
  error
});
/**
 * @return {object} - returns an object of books
 * @param {object} book - contains books in the library
 */
export const getAllBooksAction = () => dispatch =>
  axios.get('/api/v1/books').then((response) => {
    const books = response.data;
    dispatch(getAllBooks({ books }));
  })
    .catch((error) => {
      dispatch(getAllBooksError(error.response.data));
      return error;
    });
export const borrowBookAction = bookData => dispatch =>
  axios.post(`/api/v1/users/${bookData.userId}/books`,
    { membership: bookData.membership, bookId: `${bookData.bookId}` })
    .then((response) => {
      const bookMessage = response.data;
      console.log('working as intended',bookMessage);
      dispatch(borrowBook({ bookMessage }));
    })
    .catch((error) => {
      dispatch(borrowBookError(error.response.data));
      return error;
    }
    );
  /**
 * @return {object} - returns an object of history
 * @param {object} book - contains user history in the library
 */
export const getHistoryAction = userData => dispatch =>
  axios.get(`/api/v1/users/${userData.userId}/history`)
    .then((response) => {
      const history = response.data;
      console.log('This is awesome', history);
      dispatch(getHistory({ history }));
    })
    .catch((error) => {
      console.log('something went wrong', error);
      dispatch(getHistoryError(error.response.data));
      return error;
    });

export default {
  getAllBooksAction,
  borrowBookAction,
  getHistoryAction
};
