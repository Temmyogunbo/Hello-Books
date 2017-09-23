import isEmpty from 'lodash/isEmpty';
import {
  ADD_BOOK,
  ADD_BOOK_ERROR
} from '../constants/actionTypes';

const initialState = {
  bookAdded: false,
  bookMessage: {},
  error: {}
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
  case ADD_BOOK:
    return {
      ...state,
      bookMessage: action.message,
      bookAdded: !isEmpty(action.message)
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
