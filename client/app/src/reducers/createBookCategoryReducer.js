import isEmpty from 'lodash/isEmpty';
import {
  CREATE_BOOK_CATEGORY,
  CREATE_BOOK_CATEGORY_ERROR,
} from '../constants/actionTypes';

const initialState = {
  thereIsCategory: false,
  category: {},
  error: {}
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case CREATE_BOOK_CATEGORY:
      return {
        ...state,
        category: action.category,
        thereIsCategory: !isEmpty(action.category),
        error: {}
      };
    case CREATE_BOOK_CATEGORY_ERROR:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};
