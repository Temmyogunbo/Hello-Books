import isEmpty from 'lodash/isEmpty';
import {
  DELETE_BOOK,
  EDIT_BOOK,
  GET_ALL_BOOKS,
  GET_A_BOOK,
  ADD_BOOK,
  BORROW_A_BOOK
} from '../constants/actionTypes';

const initialState = [];
let newState;

export default (state = initialState, action = {}) => {
  switch (action.type) {
  case ADD_BOOK:
    return [...state, action.book];
  case GET_A_BOOK:
    return [action.book];
  case GET_ALL_BOOKS:
    return action.books;
  case EDIT_BOOK:
    newState = state.filter(book => book.id !== action.book.bookId);
    return [...newState, action.book];
  case BORROW_A_BOOK:
    return state.map(book => (parseInt(book.id, 10) === parseInt(action.id, 10) ? parseInt(book.quantity, 10) - 1 : book));
  case DELETE_BOOK:
    return state.filter(book => book.id !== action.id);
  default:
    return state;
  }
};
