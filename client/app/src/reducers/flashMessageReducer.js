import shortid from 'shortid';
import { findIndex } from "lodash/findIndex";
import {
  ADD_FLASH_MESSAGE,
  DELETE_FLASH_MESSAGE
} from "../constants/actionTypes";

const initialState = [];
export default (state = initialState, action) => {
  switch (action.type) {
  case ADD_FLASH_MESSAGE:
    return [
      ...state,
      {
        id: shortid.generate(),
        message: action.message
      }
    ];
  case DELETE_FLASH_MESSAGE:
    const index = findIndex(state, { id: action.id });
    if (index >= 0) {
      return [
        ...state.slice(0, index),
        ...state.slice(index + 1)
      ];
    }

  default:
    return state;
  }
};
