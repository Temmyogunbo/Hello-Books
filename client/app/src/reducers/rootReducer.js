import { combineReducers } from 'redux';
import userReducer from './userReducer';
import bookReducer from './bookReducer';
import borrowBookReducer from './borrowBookReducer';
import historyReducer from './historyReducer';
import returnBookReducer from './returnBookReducer';
import addBookReducer from './addBookReducer';
import deleteBookReducer from './deleteBookReducer';
import getBookCategoryReducer from './getBookCategoryReducer';
import createBookCategoryReducer from './createBookCategoryReducer';

export default combineReducers({
  userReducer,
  bookReducer,
  borrowBookReducer,
  historyReducer,
  returnBookReducer,
  addBookReducer,
  deleteBookReducer,
  getBookCategoryReducer,
  createBookCategoryReducer
});
