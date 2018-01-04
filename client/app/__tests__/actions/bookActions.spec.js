
import expect from 'expect';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';

import {
  editBookAction,
  addBookAction,
  getBookOrBooksAction,
  deleteBookAction,
} from '../../src/actions/bookAction';
import {
  EDIT_BOOK,
  ADD_BOOK,
  GET_ALL_BOOKS,
  DELETE_BOOK,
} from '../../src/constants/actionTypes';
import {
  firstBookSample,
  secondBookSample,
  bookData,
  secondBookData,
  thirdBookData,
} from '../__mocks__/mockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
/* eslint-disable max-nested-callbacks */
describe('Given book actions', () => {
  describe('When I call the add book action', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('Then it should dispatch an action to add book', (done) => {
      moxios
        .stubRequest(
          '/api/v1/books',
          {
            status: 201,
            response: {
              book: secondBookSample,
            }
          }
        );


      const expectedActions =
        [{
          type: ADD_BOOK,
          book: secondBookSample,
        }];
      const store = mockStore({ });
      // act
      const action = addBookAction(secondBookSample);

      store.dispatch(action).then(() => {
        // assert
        const actual = store.getActions();

        expect(actual).toEqual(expectedActions);
      });

      done();
    });
  });
});

describe('Given book actions', () => {
  describe('When I call the  delete book action', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('Then it should dispatch an action to delete book', (done) => {
      moxios
        .stubRequest(
          '/api/v1/books/6',
          {
            status: 200
          }
        );


      const expectedActions = [
        {
          type: DELETE_BOOK,
          id: 6
        }
      ];
      const store = mockStore({ });
      const bookData = { id: 6 };
      // act
      const action = deleteBookAction(bookData);

      store.dispatch(action).then(() => {
        // assert
        const actual = store.getActions();

        expect(actual).toEqual(expectedActions);
      });


      done();
    });
  });
});

describe('Given book actions', () => {
  describe('When I call the get all book action', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('Then it should dispatch an action that get all books', (done) => {
      moxios
        .stubRequest(
          '/api/v1/books?page=1&itemsCountPerPage=5',
          {
            response: firstBookSample,
            headers: { 'content-type': 'application/json' }
          }
        );


      const expectedActions = [
        {
          type: GET_ALL_BOOKS,
          books: firstBookSample,
        }
      ];
      const store = mockStore({ });
      // act
      const action = getBookOrBooksAction(bookData);

      store.dispatch(action).then(() => {
        // assert
        const actual = store.getActions();

        expect(actual).toEqual(expectedActions);
      });

      done();
    });
    it(
      'Then it should dispatch an action that gets all books by category',
      (done) => {
        moxios
          .stubRequest(
            `/api/v1/books?page=1&itemsCountPerPage=5`,
            {
              response: firstBookSample,
              headers: { 'content-type': 'application/json' }
            }
          );


        const expectedActions = [
          {
            type: GET_ALL_BOOKS,
            books: firstBookSample,
          }
        ];
        const store = mockStore({});
        // act
        const action = getBookOrBooksAction(secondBookData);

        store.dispatch(action).then(() => {
        // assert
          const actual = store.getActions();

          expect(actual).toEqual(expectedActions);
        });

        done();
      }
    );
    it(
      'Then it should dispatch an action that gets a particular book',
      (done) => {
        moxios
          .stubRequest(
            `/api/v1/books?page=1&itemsCountPerPage=5`,
            {
              response: firstBookSample,
              headers: { 'content-type': 'application/json' }
            }
          );


        const expectedActions = [
          {
            type: GET_ALL_BOOKS,
            books: firstBookSample,
          }
        ];
        const store = mockStore({});
        // act
        const action = getBookOrBooksAction(thirdBookData);

        store.dispatch(action).then(() => {
        // assert
          const actual = store.getActions();

          expect(actual).toEqual(expectedActions);
        });

        done();
      }
    );
  });
});

describe('Given book actions', () => {
  describe('When I call the  edit book action', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('Then it should rdispatch an action that edits a book', (done) => {
      moxios
        .stubRequest(
          '/api/v1/books/7',
          {
            status: 204
          }
        );


      const expectedActions = [
        {
          type: EDIT_BOOK,
          book: secondBookSample,
        }
      ];
      const store = mockStore({});
      const bookData = {
        book: secondBookSample,
        id: 7
      };
      // act
      const action = editBookAction(secondBookSample);

      store.dispatch(action).then(() => {
        // assert
        const actual = store.getActions();

        expect(actual).toEqual(expectedActions);
      });


      done();
    });
  });
});
