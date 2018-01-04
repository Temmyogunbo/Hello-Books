import expect from 'expect';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';

import {
  createBookCategoryAction,
  getBookCategoryAction,
} from '../../src/actions/categoryAction';
import {
  CREATE_BOOK_CATEGORY,
  GET_BOOK_CATEGORY,
} from '../../src/constants/actionTypes';

import {
  category,
  secondcategorySample,
  categoryData,
} from '../__mocks__/mockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

/* eslint-disable max-nested-callbacks */

describe('Given category actions', () => {
  describe('When I call the create book category action', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('Then it should dispatch GETBookCategory', (done) => {
      moxios
        .stubRequest(
          '/api/v1/category',
          {
            status: 201,
            response: category,
          }
        );


      const expectedActions =
                [{
                  type: GET_BOOK_CATEGORY,
                  category
                }];
      const store = mockStore({ });
      // act
      const action = getBookCategoryAction(categoryData);

      store.dispatch(action).then(() => {
        // assert
        const actual = store.getActions();

        expect(actual).toEqual(expectedActions);
      });

      done();
    });
  });
});

describe('Given category actions', () => {
  describe('When I call the create book category action', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('Then it should dispatch createBookCategory', (done) => {
      moxios
        .stubRequest(
          '/api/v1/category',
          {
            status: 200,
            response:
              { category: secondcategorySample, },
          }
        );


      const expectedActions =
        [{
          type: CREATE_BOOK_CATEGORY,
          category: secondcategorySample
        }];
      const store = mockStore({});
      // act
      const action = createBookCategoryAction(categoryData);

      store.dispatch(action).then(() => {
        // assert
        const actual = store.getActions();

        expect(actual).toEqual(expectedActions);
      });

      done();
    });
  });
});
