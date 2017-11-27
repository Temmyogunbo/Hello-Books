import axios from 'axios';
import toastr from 'toastr';
import {
  getAllNotificationsAction,
} from './notificationsAction';

//import notifications from './notifications';
import {
  EDIT_BOOK,
  EDIT_BOOK_ERROR,
  ADD_BOOK,
  ADD_BOOK_ERROR,
  GET_ALL_BOOKS,
  GET_ALL_BOOKS_ERROR,
  BORROW_A_BOOK,
  BORROW_A_BOOK_ERROR,
  RETURN_A_BOOK,
  RETURN_A_BOOK_ERROR,
  DELETE_BOOK,
  DELETE_BOOK_ERROR,
} from '../constants/actionTypes';
/**
 *
 * @param {object} book
 * @return {book} book - dispatched book object
 */
const editBook = book => ({
  type: EDIT_BOOK,
  book
});
/**
 *
 * @return {object} error
 * @param {error} error - dispatched error object
 */
const editBookError = error => ({
  type: EDIT_BOOK_ERROR,
  error
});
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
 *
 * @param {bookId} id
 * @return {object} description delete book object
 *
 */
const deleteBook = id => ({
  type: DELETE_BOOK,
  id
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
 * @param {error} id - dispatched book id
 */
const borrowBook = id => ({
  type: BORROW_A_BOOK,
  id
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
 * @return {returnMessage} returnMessage - dispatched returned message
 * @param {object} BookReturned book details
 */
const returnBook = BookReturned => ({
  type: RETURN_A_BOOK,
  BookReturned
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
* @return {object} - returns an object of book
* @param {object} bookData - contains book message in the library
*/
export const addBookAction = bookData => dispatch =>
  axios.post('api/v1/books', bookData)
    .then((response) => {
      dispatch(addBook(response.data.book));
      toastr.success('Book(s) successfully added to the library.');
    })
    .catch((error) => {
      dispatch(addBookError(error.response.data.msg));
      toastr.error(error.response.data.msg);
    });

/**
 * @param {object} bookData
 * @return {object} - returns an object of books
 */
export const getAllBooksAction = bookData => dispatch => {
  let bookRoute = `/api/v1/books`;
  if (bookData.bookCategory) {
    bookRoute = `/api/v1/books?category=${bookData.bookCategory.category}`;
  }
  if (bookData.bookId) {
    bookRoute = `/api/v1/books/${bookData.bookId}`;
  }
  return axios.get(bookRoute).then((response) => {
    dispatch(getAllBooks(response.data));
  })
    .catch((error) => {
      dispatch(getAllBooksError(error.response.data.errors[0].msg));
      toastr.error(error.response.data.errors[0].msg);
    });
};
/**
* @param {bookData} bookData
* @return {object} response
*/
export const borrowBookAction = bookData => dispatch =>
  axios.post(
    `/api/v1/users/${bookData.userId}/books`,
    { membership: bookData.membership, bookId: `${bookData.bookId}` }
  )
    .then(() => {
      dispatch(borrowBook(bookData.bookId));
      toastr.success('You successfully borrowed a book');
      console.log('damn it')
      getAllNotificationsAction({
        userId: `${bookData.userId}`,
        bookId: `${bookData.bookId}`,
        notificationType: 'BOOK_BORROWED'
      }, dispatch);
      console.log('you man')
    })
    .catch((error) => {
      dispatch(borrowBookError(error.response.data));
      toastr.error(error.response.data.msg);
    });

/**
 * @return {object} - returns an object of return book
 * @param {object} returnData - contains details of user history
 */
export const returnBookAction = returnData => dispatch =>
  axios.put(
    `api/v1/users/${returnData.userId}/books`,
    { bookId: returnData.BookId }
  )
    .then((response) => {
      const newHistoryObject = { ...returnData.historyObj, returned: true };
      dispatch(returnBook(newHistoryObject));
      toastr.success(response.data.msg);
      console.log('say god')
      getAllNotificationsAction({
        userId: `${returnData.userId}`,
        bookId: `${returnData.BookId}`,
        notificationType: 'BOOK_RETURNED'
      }, dispatch);
      console.log('woops')
    })
    .catch((error) => {
      dispatch(returnBookEror(error.response.data));
      toastr.error(error.response.data.msg);
    });
/**
 *  @return {object} - returns an object of book
 * @param {object} bookData - contains id of book to be deleted
*/
export const deleteBookAction = bookData => dispatch =>
  axios.delete(`api/v1/books/${bookData.id}`)
    .then(() => {
      dispatch(deleteBook(bookData.id));
      toastr.success('Book deleted');
    })
    .catch((error) => {
      dispatch(deleteBookError(error.response.data));
      toastr.error(error.response.data.msg);
    });

/**
* @return {object} - returns an empty object of book
* @param {object} bookData - contains book message in the library
*/
export const editBookAction = bookData => (dispatch) => {
  axios.put(`api/v1/books/${bookData.bookId}`, bookData)
    .then(() => {
      dispatch(editBook(bookData));
      toastr.success('Book updated successfully');
    })
    .catch((error) => {
      dispatch(editBookError(error.response.data));
      toastr.error(error.response.data.msg);
    });
};
export default {
  editBookAction,
  addBookAction,
  getAllBooksAction,
  borrowBookAction,
  returnBookAction,
  deleteBookAction
};
