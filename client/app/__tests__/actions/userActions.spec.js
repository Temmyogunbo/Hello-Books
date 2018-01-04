
import expect from 'expect';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';

import {
  getHistoryAction,
  signupAction,
  signinAction,
  signOutAction,
  changePasswordAction
} from '../../src/actions/userActions';
import {
  CHANGE_USERS_PASSWORD,
  LOG_OUT_USERS,
  SET_AUTH_USERS,
  GET_USER_HISTORY,
} from '../../src/constants/actionTypes';
import {
  user,
  signinData,
  signupData,
  userPassword,
  passwordResponse,
  userHistory,
  userData,
} from '../__mocks__/mockData';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

/* eslint-disable max-nested-callbacks */
describe('Given userAction', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  describe('When I call the signAction', () => {
    it('Then it should dispatch setAuthUser ', (done) => {
      moxios.stubRequest(
        '/api/v1/users/signin',
        {
          response: user,
          headers: { 'content-type': 'application/json' }
        }
      );

      const expectedAction = [{
        type: SET_AUTH_USERS,
        user: user
      }];
      const store = mockStore({ });
      // act
      const action = signinAction(signinData);
      store.dispatch(action).then(() => {
        // assert
        const actual = store.getActions();
        expect(actual).toEqual(expectedAction);
      });
      done();
    });
  });
});

describe('Given userActions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  describe('When I call signupAction', () => {
    it('Then it should dispatch setAuthUser', (done) => {
      moxios.stubRequest(
        '/api/v1/users/signup',
        {
          response: user,
          headers: { 'content-type': 'application/json' }
        }
      );

      const expectedAction = [{
        type: SET_AUTH_USERS,
        user
      }];
      const store = mockStore({});
      // act
      const action = signupAction(signupData);
      store.dispatch(action).then(() => {
        // assert
        const actual = store.getActions();
        expect(actual).toEqual(expectedAction);
      });
      done();
    });
  });
});


describe('Given userActions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  describe('When I call changePasswordAction', () => {
    it('Then it should dispatch changeUserPassword', (done) => {
      moxios.stubRequest(
        '/api/v1/users/change-password',
        {
          response: userPassword,
          headers: { 'content-type': 'application/json' }
        }
      );

      const expectedAction = [{
        type: CHANGE_USERS_PASSWORD,
        user: passwordResponse
      }];
      const store = mockStore({});
      // act
      const action = changePasswordAction(userPassword);
      store.dispatch(action).then(() => {
        // assert
        const actual = store.getActions();
        expect(actual).toEqual(expectedAction);
      });
      done();
    });
  });
});


describe('Given userActions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  describe('When I call getHistoryAction', () => {
    it('Then it should dispatch getHistory', (done) => {
      moxios.stubRequest(
        `/api/v1/users/2/history?page=1&itemsCountPerPage=5&returned=false`,
        {
          response: userHistory,
          headers: { 'content-type': 'application/json' }
        }
      );

      const expectedAction = {
        type: GET_USER_HISTORY,
        userHistory
      };
      const store = mockStore({});
      // act
      const action = getHistoryAction(userData);
      store.dispatch(action).then(() => {
        // assert
        const actual = store.getActions();
        expect(actual).toEqual(expectedAction);
      });
      done();
    });
  });
});


describe('Given userActions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  describe('When I call changePasswordAction', () => {
    it('Then it should dispatch changeUserPassword', (done) => {
      moxios.stubRequest(
        '/api/v1/users/change-password',
        {
          response: userPassword,
          headers: { 'content-type': 'application/json' }
        }
      );

      const expectedAction = [{
        type: CHANGE_USERS_PASSWORD,
        user: passwordResponse
      }];
      const store = mockStore({});
      // act
      const action = changePasswordAction(userPassword);
      store.dispatch(action).then(() => {
        // assert
        const actual = store.getActions();
        expect(actual).toEqual(expectedAction);
      });
      done();
    });
  });
});


describe('Given userActions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  describe('When I call signOutAction', () => {
    it('Then it should dispatch logOutUser', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200
        });
      });
      const expectedAction = [
        {
          type: LOG_OUT_USERS
        }
      ];
      const store = mockStore({});
      // act
      const action = signOutAction();
      store.dispatch(action);
      // assert
      const actual = store.getActions();
      expect(actual).toEqual(expectedAction);
      done();
    });
  });
});
