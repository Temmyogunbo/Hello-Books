
import expect from 'expect';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import * as bookActions from '../../src/actions/bookAction';
import * as types from '../../src/constants/actionTypes';
import LocalStorage from '../__mocks__/localStorage';
import {
  book1,
  book2,
  bookData,
  bookData2,
  bookData3
} from '../__mocks__/mockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Given book actions', () => {
  describe('When I call the add book action', () => {
    beforeEach(() => {
      global.toastr = { toastr: () => { } };
      global.history = { push: () => { } };
      global.history = { replace: () => { } };
      global.localStorage = new LocalStorage();
    });
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('Then it should return an add book object', (done) => {
      moxios
        .stubRequest(
          '/api/v1/books',
          {
            status: 201,
            response: {
              book: book2
            },
          }
        );


      const expectedActions =
        [{
          type: types.ADD_BOOK,
          book: book2
        }];
      const store = mockStore({ });
      // act
      const action = bookActions.addBookAction(book2);

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
    beforeEach(() => {
      global.toastr = { toastr: () => { } };
      global.history = { push: () => { } };
      global.history = { replace: () => { } };
      global.localStorage = new LocalStorage();
    });
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('Then it should return an object containing book id', (done) => {
      moxios
        .stubRequest(
          '/api/v1/books/6',
          {
            status: 200
          }
        );


      const expectedActions = [
        {
          type: types.DELETE_BOOK,
          id: 6
        }
      ];
      const store = mockStore({ });
      const bookData = { id: 6 };
      // act
      const action = bookActions.deleteBookAction(bookData);

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
    beforeEach(() => {
      global.toastr = { toastr: () => { } };
      global.history = { push: () => { } };
      global.history = { replace: () => { } };
      global.localStorage = new LocalStorage();
    });
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('Then it should return an object containing all books', (done) => {
      moxios
        .stubRequest(
          '/api/v1/books?page=1&itemsCountPerPage=5',
          {
            response: book1,
            headers: { 'content-type': 'application/json' }
          }
        );


      const expectedActions = [
        {
          type: types.GET_ALL_BOOKS,
          books: book1
        }
      ];
      const store = mockStore({ });
      // act
      const action = bookActions.getAllBooksAction(bookData);

      store.dispatch(action).then(() => {
        // assert
        const actual = store.getActions();

        expect(actual).toEqual(expectedActions);
      });

      done();
    });
    it('Then it should return an object containing all books by category', (done) => {
      moxios
        .stubRequest(
          `/api/v1/books?page=1&itemsCountPerPage=5`,
          {
            response: book1,
            headers: { 'content-type': 'application/json' }
          }
        );


      const expectedActions = [
        {
          type: types.GET_ALL_BOOKS,
          books: book1
        }
      ];
      const store = mockStore({});
      // act
      const action = bookActions.getAllBooksAction(bookData2);

      store.dispatch(action).then(() => {
        // assert
        const actual = store.getActions();

        expect(actual).toEqual(expectedActions);
      });

      done();
    });
    it('Then it should return an object containing a particular book', (done) => {
      moxios
        .stubRequest(
          `/api/v1/books?page=1&itemsCountPerPage=5`,
          {
            response: book1,
            headers: { 'content-type': 'application/json' }
          }
        );


      const expectedActions = [
        {
          type: types.GET_ALL_BOOKS,
          books: book1
        }
      ];
      const store = mockStore({});
      // act
      const action = bookActions.getAllBooksAction(bookData3);

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
  describe('When I call the  edit book action', () => {
    beforeEach(() => {
      global.toastr = { toastr: () => { } };
      global.history = { push: () => { } };
      global.history = { replace: () => { } };
      global.localStorage = new LocalStorage();
    });
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('Then it should return an object containing book id', (done) => {
      moxios
        .stubRequest(
          '/api/v1/books/7',
          {
            status: 204
          }
        );


      const expectedActions = [
        {
          type: types.EDIT_BOOK,
          book: book2
        }
      ];
      const store = mockStore({});
      const bookData = {
        book: book2,
        id: 7
      };
      // act
      const action = bookActions.editBookAction(book2);

      store.dispatch(action).then(() => {
        // assert
        const actual = store.getActions();

        expect(actual).toEqual(expectedActions);
      });


      done();
    });
  });
});
