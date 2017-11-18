import isEmpty from 'lodash/isEmpty';
import {
  DELETE_BOOK_ERROR,
  EDIT_BOOK_ERROR,
  GET_ALL_BOOKS_ERROR,
  GET_A_BOOK_ERROR,
  ADD_BOOK_ERROR,
  CREATE_BOOK_CATEGORY_ERROR,
  GET_BOOK_CATEGORY_ERROR,
  RETURN_A_BOOK_ERROR,
  BORROW_A_BOOK_ERROR,
  GET_USER_HISTORY_ERROR,
  SET_AUTH_USERS_ERROR

} from '../constants/actionTypes';

const initialState = {
  error: []
};
export default (state = initialState, action = {}) => {
  switch (action.type) {
  case CREATE_BOOK_CATEGORY_ERROR:
    return {
      ...state,
      error: action.error
    };
  case GET_BOOK_CATEGORY_ERROR:
    return {
      ...state,
      error: action.error
    };
  case DELETE_BOOK_ERROR:
    return {
      ...state,
      error: action.error
    };
  case EDIT_BOOK_ERROR:
    return {
      ...state,
      error: action.error
    };
  case GET_ALL_BOOKS_ERROR:
    return {
      ...state,
      error: action.error
    };
  case GET_A_BOOK_ERROR:
    return {
      ...state,
      error: action.error
    };
  case RETURN_A_BOOK_ERROR:
    return {
      ...state,
      error: action.error
    };
  case ADD_BOOK_ERROR:
    return {
      ...state,
      error: action.error
    };
  case BORROW_A_BOOK_ERROR:
    return {
      ...state,
      error: action.error
    };
  case GET_USER_HISTORY_ERROR:
    return {
      ...state,
      error: action.error
    };
  case SET_AUTH_USERS_ERROR:
    return {
      ...state,
      error: action.error
    };
  default:
    return state;
  }
};
