
import expect from 'expect';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import * as bookActions from '../../src/actions/bookAction';
import * as types from '../../src/constants/actionTypes';
import LocalStorage from '../mocks/localStorage';
import {
  book1
} from '../mocks/mockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Given book actions', () => {
  describe('When I need a book', () => {
    beforeEach(() => {
      global.toastr = { toastr: () => { } };
      global.history = { push: () => { } };
      global.history = { replace: () => { } };
      global.localStorage = new LocalStorage();
    });
    afterEach(() => {
      fetchMock.reset();
      fetchMock.restore();
    });

    it('Then I can add book to the library', (done) => {
      fetchMock
        .getOnce(
          '/api/v1/books?page=1&temsCountPerPage=2',
          {
            body: { books: book1 },
            headers: { 'content-type': 'application/json' }
          }
        );


      const expectedActions = [
        {
          type: types.GET_ALL_BOOKS,
          books: book1
        }
      ];
      const store = mockStore({ rows: [], count: 0 });
      // act
      const action = bookActions.getAllBooks(book1);

      store.dispatch(action);

      // assert
      const actual = store.getActions();
      console.log('000000', actual)

      expect(actual).toEqual(expectedActions);
      done();
    });
  });
});
