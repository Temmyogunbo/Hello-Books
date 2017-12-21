import expect from 'expect';
import * as types from '../../src/constants/actionTypes';
import userReducer from '../../../app/src/reducers/userReducer';


describe('user reducer', () => {
  const initialState = {
    isAuthenticated: false,
    user: {}
  };
  it('should return the initial state', () => {
    expect(userReducer(initialState, {})).toEqual({
      isAuthenticated: false,
      user: {}
    });
  });
  it('should return state', () => {
    expect(userReducer(undefined, {})).toEqual({
      isAuthenticated: false,
      user: {}
    });
  });
  it('should handle SET_AUTH_USERS', () => {
    expect(userReducer(initialState, {
      type: types.SET_AUTH_USERS,
      user: {
        email: "temmyogunbo@gmail.com",
        userName: "temmy",
        fullName: "Emmanuel",
        id: 1,
        role: "admin",
        membership: "gold"
      }
    })).toEqual({
      user: {
        email: "temmyogunbo@gmail.com",
        userName: "temmy",
        fullName: "Emmanuel",
        id: 1,
        role: "admin",
        membership: "gold"
      },
      isAuthenticated: true
    });
  });
  it('should handele CHANGE_USERS_PASSWORD', () => {
    expect(userReducer({
      isAuthenticated: true,
      user: {
        email: "temmyogunbo@gmail.com",
        userName: "temmy",
        fullName: "Emmanuel",
        id: 1,
        role: "admin",
        membership: "gold"
      }
    }, {
      type: types.CHANGE_USERS_PASSWORD,
      isAuthenticated: true,
      user: {}
    })).toEqual({
      isAuthenticated: true,
      user: {
        email: "temmyogunbo@gmail.com",
        userName: "temmy",
        fullName: "Emmanuel",
        id: 1,
        role: "admin",
        membership: "gold"
      }
    });
  });
});
