import axios from 'axios';
import toastr from 'toastr';

import {
  getAllNotificationsAction,
} from './notificationsAction';

import {
  EDIT_BOOK,
  ADD_BOOK,
  GET_ALL_BOOKS,
  BORROW_A_BOOK,
  RETURN_A_BOOK,
  DELETE_BOOK,
} from '../constants/actionTypes';

/**
 *Dispatched action to edit book

 * @param {object} book
 *
 * @return {book} object
 */
export const editBook = book => ({
  type: EDIT_BOOK,
  book
});

/**Dispatched action to add book
 *
 * @param {object} book
 *
 * @return {book} book - dispatched book object
 */
export const addBook = book => ({
  type: ADD_BOOK,
  book
});

/**Dispatched action to delete book
 *
 * @param {bookId} id
 *
 * @return {object} description delete book object
 *
 */
export const deleteBook = id => ({
  type: DELETE_BOOK,
  id
});

/**Dispatched action to get all books
 *
 * @param {books} books
 *
 * @return {object} object
 *
 */
export const getAllBooks = books => ({
  type: GET_ALL_BOOKS,
  books
});

/**Dispatched borrow book action
 *
 * @return {object} All books
 *
 * @param {error} id - dispatched book id
 */
export const borrowBook = id => ({
  type: BORROW_A_BOOK,
  id
});

/**Dispatched return book action
 *
 * @return {returnMessage} returnMessage - dispatched returned message
 *
 * @param {object} bookReturned book details
 */
export const returnBook = bookReturned => ({
  type: RETURN_A_BOOK,
  bookReturned
});

/**It returns book object
 *
* @return {object} - returns an object of book

* @param {object} bookData - contains book message in the library
*/
export const addBookAction = bookData => dispatch =>
  axios.post('/api/v1/books', bookData)
    .then((response) => {
      dispatch(addBook(response.data.book));
      toastr.success('Book(s) successfully added to the library.');
    })
    .catch((error) => {
      toastr.error(error.response.data.msg);
    });

/**It returns all book object
 *
 * @param {object} bookData
 *
 * @return {object} - returns an object of books
 */
export const getAllBooksAction = bookData => dispatch => {
  let bookRoute =
   `/api/v1/books?page=${bookData.currentPage}&` +
   `itemsCountPerPage=${bookData.itemsCountPerPage}`;
  if (bookData.bookCategory) {
    bookRoute = `/api/v1/books?page=${bookData.currentPage}&` +
    `itemsCountPerPage=${bookData.itemsCountPerPage}&category=` +
    `${bookData.bookCategory.category}`;
  }
  if (bookData.bookId) {
    bookRoute = `/api/v1/books/${bookData.bookId}`;
  }
  return axios.get(bookRoute).then((response) => {
    dispatch(getAllBooks(response.data));
  })
    .catch((error) => {
      toastr.error(error.response.data.errors[0].msg);
    });
};
/**It returns borrow book object
 *
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
      getAllNotificationsAction({
        userId: `${bookData.userId}`,
        bookId: `${bookData.bookId}`,
        notificationType: 'BOOK_BORROWED'
      }, dispatch);
    })
    .catch((error) => {
      toastr.error(error.response.data.msg);
    });

/**It returns book
 *
 * @return {object} - returns an object of return book
 *
 * @param {object} returnData - contains details of user history
 */
export const returnBookAction = returnData => dispatch =>
  axios.put(
    `/api/v1/users/${returnData.userId}/books`,
    { bookId: returnData.BookId }
  )
    .then((response) => {
      const { historyObj } = returnData;
      dispatch(returnBook(historyObj));
      toastr.success(response.data.msg);
      getAllNotificationsAction({
        userId: `${returnData.userId}`,
        bookId: `${returnData.BookId}`,
        notificationType: 'BOOK_RETURNED'
      }, dispatch);
    })
    .catch((error) => {
      toastr.error(error.response.data.msg);
    });
/**It returns delete book object
 *
 *  @return {object} - returns an object of book
 *
 * @param {object} bookData - contains id of book to be deleted
*/
export const deleteBookAction = bookData => dispatch =>
  axios.delete(`/api/v1/books/${bookData.id}`)
    .then(() => {
      dispatch(deleteBook(bookData.id));
      toastr.success('Book deleted');
    })
    .catch((error) => {
      toastr.error(error.response.data.msg);
    });

/**It returns edit book object
 *
* @return {object} - returns an empty object of book

* @param {object} bookData - contains book message in the library
*/
export const editBookAction = bookData => (dispatch) =>
  axios.put(`/api/v1/books/${bookData.id}`, bookData)
    .then(() => {
      dispatch(editBook(bookData));
      toastr.success('Book updated successfully');
    })
    .catch((error) => {
      toastr.error(error.response.data.msg);
    });
export default {
  editBookAction,
  addBookAction,
  getAllBooksAction,
  borrowBookAction,
  returnBookAction,
  deleteBookAction
};
