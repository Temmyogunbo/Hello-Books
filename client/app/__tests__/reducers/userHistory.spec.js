import expect from 'expect';
import * as types from '../../src/constants/actionTypes';
import userHistoryReducer from '../../../app/src/reducers/userHistoryReducer';
import * as userActions from '../../src/actions/userActions';
import { returnBook } from '../../src/actions/bookAction';

describe('user history reducer', () => {
  const initialState = { rows: [], count: 0 };
  it('should return the initial state', () => {
    expect(userHistoryReducer(initialState, {})).toEqual(initialState);
  });
  it('should return state', () => {
    expect(userHistoryReducer(undefined, {})).toEqual(initialState);
  });
  it('should handle GET_USER_HISTORY', () => {

    const action = userHistoryReducer(initialState, userActions.getHistory({
      rows: [{
        Book: { author: "Stephen Kof", title: "You Don't know JS" },
        BookId: 2,
        borrowedDate: "2017-11-29T16:04:12.824Z",
        dueDate: "2017-12-05T16:04:12.824Z",
        returned: false
      },
      {
        Book: { author: "Andrew Miles", title: "Clash of the Titans" },
        BookId: 4,
        borrowedDate: "2017-11-29T15:53:00.280Z",
        dueDate: "2017-12-05T15:53:00.280Z",
        returned: false
      }],
      count: 2
    }));
    expect(action).toEqual({
      rows: [{
        Book: { author: "Stephen Kof", title: "You Don't know JS" },
        BookId: 2,
        borrowedDate: "2017-11-29T16:04:12.824Z",
        dueDate: "2017-12-05T16:04:12.824Z",
        returned: false
      },
      {
        Book: { author: "Andrew Miles", title: "Clash of the Titans" },
        BookId: 4,
        borrowedDate: "2017-11-29T15:53:00.280Z",
        dueDate: "2017-12-05T15:53:00.280Z",
        returned: false
      }],
      count: 2
    });
  });
  it('should handle RETURN_A_BOOK when initial state contains previous data', () => {
    const action = userHistoryReducer({
      rows: [{
        Book: { author: "Stephen Kof", title: "You Don't know JS" },
        BookId: 1,
        borrowedDate: "2017-11-29T16:04:12.824Z",
        dueDate: "2017-12-05T16:04:12.824Z",
        returned: true
      },
      {
        Book: { author: "Stephen Kof", title: "You Don't know JS" },
        BookId: 2,
        borrowedDate: "2017-11-29T16:04:12.824Z",
        dueDate: "2017-12-05T16:04:12.824Z",
        returned: false
      }],
      count: 2
    }, returnBook({
        Book: { author: "Stephen Kof", title: "You Don't know JS" },
        BookId: 2,
        borrowedDate: "2017-11-29T16:04:12.824Z",
        dueDate: "2017-12-05T16:04:12.824Z",
        returned: false
    }))
    expect(action).toEqual(
      { "count": 2,
       "rows": [
         { "Book": {
            "author": "Stephen Kof", 
            "title": "You Don't know JS" 
          }, 
          "BookId": 1, 
          "borrowedDate": "2017-11-29T16:04:12.824Z", 
          "dueDate": "2017-12-05T16:04:12.824Z", 
          "returned": true 
        }, 
        {
           "Book": {
              "author": "Stephen Kof", 
              "title": "You Don't know JS" 
            },
             "BookId": 2, 
             "borrowedDate": "2017-11-29T16:04:12.824Z", 
             "dueDate": "2017-12-05T16:04:12.824Z", 
             "returned": true
             }
            ] 
          }       
               )   ;
  });
});

