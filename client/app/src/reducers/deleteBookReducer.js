import isEmpty from 'lodash/isEmpty';
import {
  DELETE_BOOK,
  DELETE_BOOK_ERROR
} from '../constants/actionTypes';

const initialState = {
  bookDeleted: false,
  deleteMessage: {},
  error: {}
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case DELETE_BOOK:
      return {
        ...state,
        deleteMessage: action.deleteMessage,
        bookDeleted: !isEmpty(action.deleteMessage)
      };
    case DELETE_BOOK_ERROR:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};
