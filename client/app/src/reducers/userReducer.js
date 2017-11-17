import isEmpty from 'lodash/isEmpty';
import { SET_AUTH_USERS } from '../constants/actionTypes';

const initialState = {
  isAuthenticated: false,
  user: {}
};

/**
 *
 *
 * @param {object} [action={}] - object payload from the actions
 * @returns {object} - returns users in an object
*/

export default (state = initialState, action = {}) => {
  switch (action.type) {
  case SET_AUTH_USERS:
    return {
      ...state,
      user: action.user,
      isAuthenticated: !isEmpty(action.user),
      error: {}
    };
  default:
    return state;
  }
};

