import expect from 'expect';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';

import {
  getAllNotificationsAction,
} from '../../src/actions/notificationsAction';
import {
  GET_ALL_NOTIFICATIONS,
} from '../../src/constants/actionTypes';
import { notifications } from '../__mocks__/mockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

/* eslint-disable max-nested-callbacks */

describe('Given notificationsActions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  describe('When I call getAllNotificationsAction', () => {
    it('Then it should dispatch getAllNotifications', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200
        });
      });
      const expectedAction = [
        {
          type: GET_ALL_NOTIFICATIONS,
          total: 1,
          notifications
        }
      ];
      const store = mockStore({});
      // act
      const action = getAllNotificationsAction(1, notifications);
      store.dispatch(action);
      // assert
      const actual = store.getActions();
      expect(actual).toEqual(expectedAction);
      done();
    });
  });
});
