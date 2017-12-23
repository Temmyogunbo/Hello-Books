import isEmpty from 'lodash/isEmpty';
import {
  CHANGE_USERS_PASSWORD,
  SET_AUTH_USERS,
  LOG_OUT_USERS,
} from '../constants/actionTypes';

const initialState = {
  isAuthenticated: false,
  user: {},
};

/**
 * Handles user state
 *
 * @param {object} state
 * @param {object} action
 *
 * @returns {object} new state
*/
export default (state = initialState, action) => {
  switch (action.type) {
  case SET_AUTH_USERS:
    return {
      user: action.user,
      isAuthenticated: !isEmpty(action.user),
    };
  case CHANGE_USERS_PASSWORD:
    return state;
  case LOG_OUT_USERS:
    return {
      user: {},
      isAuthenticated: false,
    };
  default:
    return state;
  }
};

