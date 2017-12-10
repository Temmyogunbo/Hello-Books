
import expect from 'expect';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import * as userActions from '../../src/actions/userActions';
import * as types from '../../src/constants/actionTypes';
import LocalStorage from '../mocks/localStorage';
import {
  token,
  user
} from '../mocks/mockData';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


global.localStorage = new LocalStorage();

describe('handle actions', () => {
  beforeEach(() => {
    global.toastr = { toastr: () => {} };
    global.history = { push: () => { } };
    global.history = { replace: () => { } };
    global.localStorage = new LocalStorage();
  });
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });
  describe('When I want to sign in', () => {
    it('Then it should create a sign in action', (done) => {
      fetchMock.postOnce('/api/v1/users/signin', {
        user: {
          success: true,
          msg: 'You are signed in',
          user,
          token
        },
        headers: { 'content-type': 'application/json' }
      });

      const expectedAction = [{
        type: types.SET_AUTH_USERS,
        user
      }];
      const store = mockStore({ userReducer: { isAuthenticated: false, user: {} } });
      // act
      const action = userActions.setAuthUser(user);
      store.dispatch(action);

      // assert
      const actual = store.getActions();
      expect(actual).toEqual(expectedAction);
      done();
    });
  });
});

