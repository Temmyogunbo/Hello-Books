import isEmpty from 'lodash/isEmpty';
import {
  GET_ALL_BOOKS,
  GET_ALL_BOOKS_ERRORS
} from '../constants/actionTypes';

const initialState = {
  thereIsBook: false,
  books: {},
  error: {}
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
  case GET_ALL_BOOKS:
    return {
      ...state,
      books: action.books,
      thereIsBook: !isEmpty(action.books),
      error: {}
    };
  case GET_ALL_BOOKS_ERRORS:
    return {
      ...state,
      error: action.error
    };
  default:
    return state;
  }
};
