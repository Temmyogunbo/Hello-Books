import { combineReducers } from 'redux';
import userReducer from './userReducer';
import userHistoryReducer from './userHistoryReducer';
import bookReducer from './bookReducer';
import errorReducer from './errorReducer';
import bookCategoryReducer from './bookCategoryReducer';
import notificationReducer from './notificationReducer';

const appReducer = combineReducers({
  userReducer,
  userHistoryReducer,
  bookReducer,
  bookCategoryReducer,
  notificationReducer,
  errorReducer
});

export default (state, action) => {
  if (action.type === 'LOG_OUT_USERS') {
    state = undefined;
  }
  return appReducer(state, action);
};
