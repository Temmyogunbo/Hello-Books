import isEmpty from 'lodash/isEmpty';
import {
  GET_USER_HISTORY,
  GET_USER_HISTORY_ERROR
} from '../constants/actionTypes';

const initialState = {
  thereIsHistory: false,
  detailedHistory: {},
  error: {}
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
  case GET_USER_HISTORY:
    return {
      ...state,
      detailedHistory: action.detailedHistory,
      thereIsHistory: !isEmpty(action.detailedHistory),
      error: {}
    };
  case GET_USER_HISTORY_ERROR:
    return {
      ...state,
      error: action.error
    };
  default:
    return state;
  }
};
