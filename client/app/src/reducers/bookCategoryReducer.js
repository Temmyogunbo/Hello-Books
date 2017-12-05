import {
  CREATE_BOOK_CATEGORY,
  GET_BOOK_CATEGORY
} from '../constants/actionTypes';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
  case CREATE_BOOK_CATEGORY:
    return [
      action.category,
      ...state
    ];
  case GET_BOOK_CATEGORY:
    return action.category;
  default:
    return state;
  }
};
