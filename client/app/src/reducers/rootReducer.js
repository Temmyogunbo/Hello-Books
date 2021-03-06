import { combineReducers } from 'redux';
import userReducer from './userReducer';
import userHistoryReducer from './userHistoryReducer';
import bookReducer from './bookReducer';
import bookCategoryReducer from './bookCategoryReducer';
import notificationsReducer from './notificationsReducer';

const appReducer = combineReducers({
  userReducer,
  userHistoryReducer,
  bookReducer,
  bookCategoryReducer,
  notificationsReducer,
});
/**
 * Handles all state
 *
 * @param {object} state - application state
 * @param {object} action - contains what to do
 *
 * @returns {object} new state
*/
export default (state, action) => appReducer(state, action);
