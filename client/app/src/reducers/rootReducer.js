import { combineReducers } from 'redux';
import userReducer from './userReducer';
import userHistoryReducer from './userHistoryReducer';
import bookReducer from './bookReducer';
import errorReducer from './errorReducer';
import flashMessageReducer from './flashMessageReducer';
import bookCategoryReducer from './bookCategoryReducer';

export default combineReducers({
  userReducer,
  userHistoryReducer,
  bookReducer,
  bookCategoryReducer,
  errorReducer,
  flashMessageReducer
});
