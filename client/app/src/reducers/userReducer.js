import isEmpty from 'lodash/isEmpty';
import { SET_AUTH_USERS, SET_AUTH_USERS_ERROR } from '../constants/actionTypes';

const initialState = {
  isAuthenticated: false,
  user: {},
  error: {}
};

/**
 *
 *
 * @param {object} [action={}] - object payload from the actions
 * @returns {object} - returns users in an object
*/

const usersReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_AUTH_USERS: {
      return { ...state,
        user: action.user,
        isAuthenticated: !isEmpty(action.user),
        error: {}
      };
    }
    case SET_AUTH_USERS_ERROR:
      return { ...state,
        error: action.error
      };
    default:
      return state;
  }
};
export default usersReducer;
