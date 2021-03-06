import {
  GET_ALL_NOTIFICATIONS
} from '../constants/actionTypes';

const initialState = {};
/**
 * Handles notifications state
 *
 * @param {object} state - application state
 * @param {object} action - contains what to do
 *
 * @returns {object} new state
*/
export default (state = initialState, action) => {
  switch (action.type) {
  case GET_ALL_NOTIFICATIONS:
    return { notifications: action.notifications, total: action.total };

  default:
    return state;
  }
};
