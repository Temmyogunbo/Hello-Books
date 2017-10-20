import isEmpty from 'lodash/isEmpty';
import {
  GET_CATEGORY,
  GET_CATEGORY_ERRORS
} from '../constants/actionTypes';

const initialState = {
  thereIsCategory: false,
  category: {},
  error: {}
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_CATEGORY:
      return {
        ...state,
        category: action.category,
        thereIsCategory: !isEmpty(action.category),
        error: {}
      };
    case GET_CATEGORY_ERRORS:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};
