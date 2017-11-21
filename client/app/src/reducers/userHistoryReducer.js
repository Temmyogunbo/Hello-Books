import {
  GET_USER_HISTORY,
  RETURN_A_BOOK
} from '../constants/actionTypes';

const initialState = [];

export default (state = initialState, action = {}) => {
  switch (action.type) {
  case GET_USER_HISTORY:
    return action.detailedHistory;
  case RETURN_A_BOOK:
    return state.map(historyObject => (
      historyObject.BookId === action.BookReturned.BookId ?
        action.BookReturned : historyObject));
  default:
    return state;
  }
};
