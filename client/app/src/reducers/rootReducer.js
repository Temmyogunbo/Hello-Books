import { combineReducers } from 'redux';
import userReducer from './userReducer';
import bookReducer from './bookReducer';
import borrowBookReducer from './borrowBookReducer';
import historyReducer from './historyReducer';

export default combineReducers({
  userReducer,
  bookReducer,
  borrowBookReducer,
  historyReducer
});
