import isEmpty from 'lodash/isEmpty';
import { BORROW_A_BOOK, BORROW_A_BOOK_ERROR } from '../constants/actionTypes';

const initialState = {
  BookIsBorrowed: false,
  message: {},
  error: {}
};
export default (state = initialState, action = {}) => {
  switch (action.type) {
  case BORROW_A_BOOK:
    return {
      ...state,
      BookIsBorrowed: isEmpty(action.message),
      message: action.book,
      error: {}
    };
  case BORROW_A_BOOK_ERROR:
    return {
      ...state,
      error: action.error
    };
  default:
    return state;
  }
};
