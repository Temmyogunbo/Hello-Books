import isEmpty from 'lodash/isEmpty';
import {
  GET_USER_HISTORY,
  GET_USER_HISTORY_ERROR
} from '../constants/actionTypes';

const initialState = {
  thereIsHistory: false,
  history: {},
  error: {}
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
  case GET_USER_HISTORY:
    return {
      ...state,
      history: action.history,
      thereIsHistory: !isEmpty(action.history),
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
