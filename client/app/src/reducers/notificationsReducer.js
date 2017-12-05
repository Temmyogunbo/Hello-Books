import {
  GET_ALL_NOTIFICATIONS
} from '../constants/actionTypes';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
  case GET_ALL_NOTIFICATIONS:
    return { notifications: action.notifications, total: action.total };

  default:
    return state;
  }
};
