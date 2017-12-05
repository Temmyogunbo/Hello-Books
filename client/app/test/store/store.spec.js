import expect from 'expect';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import roootReducer from '../../src/reducers/rootReducer';
import * as userActions from '../../src/actions/userActions';

describe('Store', () => {
  describe('When a user wants to sign in', () => {
    it('Then it should store user data with action', () => {
      const store = createStore(roootReducer, applyMiddleware(thunk));
      const expected = {
        isAuthenticated: true,
        user: {
          email: 'temmyogunbo@gm….com',
          userName: 'temmy',
          fullName: 'Emmanuel',
          id: 1,
          role: 'admin',
          membership: 'gold'
        }
      };
      // act
      const action = userActions.setAuthUser({
        email: 'temmyogunbo@gm….com',
        userName: 'temmy',
        fullName: 'Emmanuel',
        id: 1,
        role: 'admin',
        membership: 'gold'
      });
      store.dispatch(action);

      // assert
      const actual = store.getState().userReducer;
      expect(actual).toEqual(expected);
    });
  });
});

