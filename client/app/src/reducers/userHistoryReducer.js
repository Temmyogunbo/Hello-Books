import {
  GET_USER_HISTORY,
  RETURN_A_BOOK
} from '../constants/actionTypes';

const initialState = { rows: [], count: 0 };
let newState;

/**
 * Handles user borrow history state
 *
 * @param {object} state
 * @param {object} action
 *
 * @returns {object} new state
*/
export default (state = initialState, action) => {
  switch (action.type) {
  case GET_USER_HISTORY:
    return { ...action.detailedHistory }
  case RETURN_A_BOOK:
    newState = state.rows.filter(historyObject => 
      historyObject.BookId === action.bookReturned.BookId ? historyObject.returned = true : historyObject);
    return {
      rows: [...newState],
      count: state.count
    };
  default:
    return state;
  }
};
