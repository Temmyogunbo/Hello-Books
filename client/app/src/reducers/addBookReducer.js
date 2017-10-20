import isEmpty from 'lodash/isEmpty';
import {
  ADD_BOOK,
  ADD_BOOK_ERROR
} from '../constants/actionTypes';

const initialState = {
  bookAdded: false,
  book: {},
  error: {}
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_BOOK:
      return {
        ...state,
        book: action.book,
        bookAdded: !isEmpty(action.book)
      };
    case ADD_BOOK_ERROR:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};
