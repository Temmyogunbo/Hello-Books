import axios from 'axios';
import {
  GET_ALL_BOOKS,
  GET_ALL_BOOKS_ERROR,
  BORROW_A_BOOK,
  BORROW_A_BOOK_ERROR,
  GET_USER_HISTORY,
  GET_USER_HISTORY_ERROR,
  RETURN_A_BOOK,
  RETURN_A_BOOK_ERROR,
  ADD_BOOK,
  ADD_BOOK_ERROR,
  DELETE_BOOK,
  DELETE_BOOK_ERROR
} from '../constants/actionTypes';

/**
 *
 * @param {msg} message - dispatched message object
 */
const deleteBook = deleteMessage => ({
  type: DELETE_BOOK,
  deleteMessage
});
/**
 *
 * @param {error} error - dispatched error object
 */
const deleteBookError = error => ({
  type: DELETE_BOOK_ERROR,
  error
});
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
 * @param {error} detailedHistory - dispatched history object
 */
const getHistory = detailedHistory => ({
  type: GET_USER_HISTORY,
  detailedHistory
});
/**
 *
 * @return {object} error
 * @param {error} error - dispatched error object
 */
const getHistoryError = error => ({
  type: GET_USER_HISTORY_ERROR,
  error
});
/**
 *
 * @return {object} return book details
 * @param {error} error - dispatched error object
 */
const returnBook = returnMessage => ({
  type: RETURN_A_BOOK,
  returnMessage
});
/**
 *
 * @return {object} message on success
 * @param {error} message - dispatched error object
 */
const addBook = message => ({
  type: ADD_BOOK,
  message
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

const returnBookEror = error => ({
  type: RETURN_A_BOOK_ERROR,
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
      dispatch(borrowBook(response.data));
    })
    .catch((error) => {
      const errorMessage = error.response.data;
      dispatch(borrowBookError(errorMessage));
    }
    );
/**
* @return {object} - returns an object of user's history
* @param {object} userData - contains user id
*/
export const getHistoryAction = userData => dispatch =>
  axios.get(`/api/v1/users/${userData.userId}/history`)
    .then((response) => {
      const userHistory = response.data;
      dispatch(getHistory({ userHistory }));
    })
    .catch((error) => {
      dispatch(getHistoryError(error.response.data));
      return error;
    });

/**
 * @return {object} - returns an object of return book
 * @param {object} returnData - contains details of user history
 */
export const returnBookAction = (returnData) => {
  return dispatch =>
    axios.put(`api/v1/users/${returnData.userId}/books`,
      { bookId: returnData.BookId })
      .then((response) => {
        dispatch(returnBook(response.data));
      })
      .catch((error) => {
        dispatch(returnBookEror(error.response.data));
        return error;
      });
};
/**
* @return {object} - returns an object of book
* @param {object} bookData - contains book message in the library
*/
export const addBookAction = (bookData) => {
  return dispatch =>
    axios.post('api/v1/books', bookData)
      .then((response) => {
        dispatch(addBook(response.data));
      })
      .catch((error) => {
        dispatch(addBookError(error.response.data));
        return error;
      });
};
/**
 *  @return {object} - returns an object of book
 * @param {object} bookData - contains id of book to be deleted
*/
export const deleteBookAction = (bookData) => {
  return dispatch =>
    axios.delete(`api/v1/books/${bookData}`)
      .then((response) => {
        dispatch(deleteBook(response.data));
      })
      .catch((error) => {
        dispatch(deleteBookError(error.response.data));
        return error;
      });
};

export default {
  getAllBooksAction,
  borrowBookAction,
  getHistoryAction,
  returnBookAction,
  addBookAction,
  deleteBookAction
};
