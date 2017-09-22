import axios from 'axios';
import {
  GET_ALL_BOOKS,
  GET_ALL_BOOKS_ERROR,
  BORROW_A_BOOK,
  BORROW_A_BOOK_ERROR,
  GET_USER_HISTORY,
  GET_USER_HISTORY_ERROR,
  RETURN_A_BOOK,
  RETURN_A_BOOK_ERROR
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
      const bookMessage = response.data;
      dispatch(borrowBook({ bookMessage }));
    })
    .catch((error) => {
      const errorMessage = error.response.data;
      dispatch(borrowBookError(errorMessage));
    }
    );
/**
* @return {object} - returns an object of history
* @param {object} book - contains user history in the library
*/
export const getHistoryAction = userData => dispatch =>
  axios.get(`/api/v1/users/${userData.userId}/history`)
    .then((response) => {
      const userHistory = response.data;
      console.log('this is awesome', userHistory);
      dispatch(getHistory({ userHistory }));
    })
    .catch((error) => {
      console.log('error was here', error);
      dispatch(getHistoryError(error.response.data));
      return error;
    });

/**
 * @return {object} - returns an object of return book
 */
export const returnBookAction = (returnData) => {
  const { userId } = { returnData };
  console.log('ooooooooooo', `${userId}`);
  console.log(`api/v1/users/${returnData.userId}/books`, '-------');
  return dispatch =>
    axios.put(`api/v1/users/${returnData.userId}/books`, { bookId: returnData.BookId })
      .then((response) => {
        console.log('return book was here', response);
        const returnMessage = response.data;
        dispatch(returnBook({ returnMessage }));
      })
      .catch((error) => {
        dispatch(returnBookEror(error.response.data));
        return error;
      });
};
export default {
  getAllBooksAction,
  borrowBookAction,
  getHistoryAction,
  returnBookAction
};
