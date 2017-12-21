import expect from 'expect';
import * as types from '../../src/constants/actionTypes';
import notificationsReducer from
  '../../../app/src/reducers/notificationsReducer';


describe('notification reducer', () => {
  const initialState = {};
  it('should return the initial state', () => {
    expect(notificationsReducer(initialState, {})).toEqual({});
  });
  it('should return state', () => {
    expect(notificationsReducer(undefined, {})).toEqual({});
  });
  it('should handle GET_ALL_NOTIFICATIONS when the initial state is empty', () => {
    expect(notificationsReducer(initialState, {
      type: types.GET_ALL_NOTIFICATIONS,
      notifications: [{
        Book: { author: "Andrew Miles", title: "Clash of the Titans" },
        User: { userName: "enodi" },
        id: 192,
        notificationType: "BOOK_RETURNED",
        seen: "unread",
        updatedAt: "2017-11-30T04:39:40.963Z"
      }],
      total: 1
    })).toEqual({
      notifications: [{
        Book: { author: "Andrew Miles", title: "Clash of the Titans" },
        User: { userName: "enodi" },
        id: 192,
        notificationType: "BOOK_RETURNED",
        seen: "unread",
        updatedAt: "2017-11-30T04:39:40.963Z"
      }],
      total: 1
    });
  });
  it('should handle GET_ALL_NOTIFICATIONS when the initial state contains notifications', () => {
    expect(notificationsReducer({
      notifications: [{
        Book: { author: "Andrew Miles", title: "Clash of the Titans" },
        User: { userName: "enodi" },
        id: 192,
        notificationType: "BOOK_RETURNED",
        seen: "unread",
        updatedAt: "2017-11-30T04:39:40.963Z"
      }],
      total: 1
    }, {
      type: types.GET_ALL_NOTIFICATIONS,
      notifications: [{
        Book: { author: "Andrew Miles", title: "Clash of the Titans" },
        User: { userName: "enodi" },
        id: 192,
        notificationType: "BOOK_RETURNED",
        seen: "unread",
        updatedAt: "2017-11-30T04:39:40.963Z"
      }, {
        Book: { author: "Andrew Miles", title: "Clash of the Titans" },
        User: { userName: "enodi" },
        id: 191,
        notificationType: "BOOK_BORROWED",
        seen: "unread",
        updatedAt: "2017-11-30T04:39:27.618Z"
      }],
      total: 2
    })).toEqual({
      notifications: [{
        Book: { author: "Andrew Miles", title: "Clash of the Titans" },
        User: { userName: "enodi" },
        id: 192,
        notificationType: "BOOK_RETURNED",
        seen: "unread",
        updatedAt: "2017-11-30T04:39:40.963Z"
      },
      {
        Book: { author: "Andrew Miles", title: "Clash of the Titans" },
        User: { userName: "enodi" },
        id: 191,
        notificationType: "BOOK_BORROWED",
        seen: "unread",
        updatedAt: "2017-11-30T04:39:27.618Z"
      }],
      total: 2
    });
  });
});
