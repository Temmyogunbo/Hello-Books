import isEmpty from 'lodash/isEmpty';
import {
  RETURN_A_BOOK,
  RETURN_A_BOOK_ERROR
} from '../constants/actionTypes';

const initialState = {
  BookIsReturn: false,
  message: {},
  error: {}
};

export default (state = initialState, action = {}) => {
  console.log('reducdr', action)
  switch (action.type) {
  case RETURN_A_BOOK:
    return {
      ...state,
      BookIsReturn: isEmpty(action.message),
      message: action.message,
      error: {}
    };
  case RETURN_A_BOOK_ERROR:
    return {
      ...state,
      error: action.error
    };
  default:
    return state;
  }
};
