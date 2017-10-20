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
  DELETE_BOOK,
  DELETE_BOOK_ERROR,
  GET_CATEGORY,
  GET_CATEGORY_ERROR
} from '../constants/actionTypes';

/**
 *
 * @param {deleteMessage} deleteMessage - dispatched deleteMessage 
 * @return {object} deleteMessage
 */
const deleteBook = deleteMessage => ({
  type: DELETE_BOOK,
  deleteMessage
});
/**
 *
 * @param {error} error - dispatched error object
 * @return {object} error
 */
const deleteBookError = error => ({
  type: DELETE_BOOK_ERROR,
  error
});
/**
 *
 * @return {object} books - Return an array of books
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
 * @param {error} book - dispatched book object
 */
const borrowBook = book => ({
  type: BORROW_A_BOOK,
  book
});
/**
 *
 * @return {object} error
 * @param {error} error - dispatched error object
 */
const borrowBookError = error => ({
  type: BORROW_A_BOOK_ERROR,
  error
});
/**
 *
 * @return {object} All history
 * @param {detailedHistory} detailedHistory - dispatched history object
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
 * @return {returnMessage} returnMessage - dispatched returned message
 * @param {object} returnMessage book details
 */
const returnBook = returnMessage => ({
  type: RETURN_A_BOOK,
  returnMessage
});

/**
 *
 * @return {object} error
 * @param {error} error - dispatched error object
 */
const returnBookEror = error => ({
  type: RETURN_A_BOOK_ERROR,
  error
});
/**
 *
 * @param {object} category
 * @return {object} category - dispatched category object
 */
const getCategory = category => ({
  type: GET_CATEGORY,
  category
});
/**
 *
 * @param {object} error
 * @return {object} error - dispatched error object
 */
const getCategoryError = error => ({
  type: GET_CATEGORY_ERROR,
  error
});

/**
 * @return {object} - returns an object of books
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
 /**
 * @param {bookData} bookData
 * @return {object} response
 */
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

/**
 *  @return {object} - returns an object of category
*/
export const getCategoryAction = () => {
  return dispatch =>
    axios.get('api/v1/category')
      .then((response) => {
        dispatch(getCategory(response.data));
      })
      .catch((error) => {
        dispatch(getCategoryError(error.response.data));
        return error;
      });
};
export default {
  getAllBooksAction,
  borrowBookAction,
  getHistoryAction,
  returnBookAction,
  deleteBookAction
};
