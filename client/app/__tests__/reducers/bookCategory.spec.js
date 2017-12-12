import expect from 'expect';
import * as types from '../../src/constants/actionTypes';
import bookCategoryReducer from '../../../app/src/reducers/bookCategoryReducer';


describe('book reducer', () => {
  const initialState = [];
  it('should return the initial state', () => {
    expect(bookCategoryReducer(initialState, {})).toEqual(initialState);
  });
  it('should return state', () => {
    expect(bookCategoryReducer(undefined, {})).toEqual(initialState);
  });
  it('should create book category', () => {
    expect(bookCategoryReducer(
      [{
        category: "Engineering",
        createdAt: "2017-11-29T17:28:44.282Z",
        id: 3,
        updatedAt: "2017-11-29T17:28:44.282Z"
      }],
      {
        type: types.CREATE_BOOK_CATEGORY,
        category: {
          category: "Law",
          createdAt: "2017-11-29T17:28:44.282Z",
          id: 4,
          updatedAt: "2017-11-29T17:28:44.282Z"
        }
      }
    )).toEqual([
      {
        category: "Law",
        createdAt: "2017-11-29T17:28:44.282Z",
        id: 4,
        updatedAt: "2017-11-29T17:28:44.282Z"
      },{
      category: "Engineering",
      createdAt: "2017-11-29T17:28:44.282Z",
      id: 3,
      updatedAt: "2017-11-29T17:28:44.282Z"
    }
  ]);
  });
  it('should get book category', () => {
    expect(bookCategoryReducer(
      initialState,
      {
        type: types.GET_BOOK_CATEGORY,
        category: [{
          category: "Law",
          createdAt: "2017-11-29T17:28:44.282Z",
          id: 4,
          updatedAt: "2017-11-29T17:28:44.282Z"
        },
        {
          category: "Engineering",
          createdAt: "2017-11-29T17:28:44.282Z",
          id: 5,
          updatedAt: "2017-11-29T17:28:44.282Z"
        }]
      }
    )).toEqual([
      {
        category: "Law",
        createdAt: "2017-11-29T17:28:44.282Z",
        id: 4,
        updatedAt: "2017-11-29T17:28:44.282Z"
      },
      {
        category: "Engineering",
        createdAt: "2017-11-29T17:28:44.282Z",
        id: 5,
        updatedAt: "2017-11-29T17:28:44.282Z"
      }]);
  });
});

