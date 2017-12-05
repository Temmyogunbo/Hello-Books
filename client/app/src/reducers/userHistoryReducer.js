import {
  GET_USER_HISTORY,
  RETURN_A_BOOK
} from '../constants/actionTypes';

const initialState = { rows: [], count: 0 };
let newState;

export default (state = initialState, action) => {
  switch (action.type) {
  case GET_USER_HISTORY:
    return { ...action };
  case RETURN_A_BOOK:
    newState = state.rows.filter(historyObject => historyObject.BookId !== action.bookReturned.BookId);
    return {
      rows: [action.bookReturned, ...newState],
      count: state.count
    };
  default:
    return state;
  }
};
