import {
  DELETE_BOOK,
  EDIT_BOOK,
  GET_ALL_BOOKS,
  ADD_BOOK,
  BORROW_A_BOOK
} from '../constants/actionTypes';

const initialState = { rows: [], count: 0 };
let newState;

export default (state = initialState, action) => {
  switch (action.type) {
  case ADD_BOOK:
    newState = state.rows.slice(1);
    return {
      rows: [
        action.book,
        ...newState
      ],
      count: state.count + 1
    };
  case GET_ALL_BOOKS:
    return { ...action };
  case EDIT_BOOK:
    newState = state.rows.filter(book => book.id !== action.book.id);
    return {
      rows: [
        action.book,
        ...newState],
      count: state.count
    };
  case BORROW_A_BOOK:
    return state.rows.map(book => {
      if (book.id === action.id) {
        book.quantity -= 1;
      }
      return {
        rows: [
          book,
          ...state.rows
        ],
        count: state.count
      };
    });
  case DELETE_BOOK:
    newState = state.rows.filter(book => book.id !== action.id);
    return {
      rows: [
        ...newState],
      count: state.count
    };
  default:
    return state;
  }
};

