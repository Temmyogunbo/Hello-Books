import socket from '../socket';
import {
  GET_ALL_NOTIFICATIONS,
} from '../constants/actionTypes';

const getAllNotifications = (notifications, total) => ({
  type: GET_ALL_NOTIFICATIONS,
  notifications,
  total
});


export const getAllNotificationsAction = (data, dispatch) => {
  const promise = new Promise((resolve, reject) => {
    socket.emit(
      'ADD_NEW_NOTIFICATION',
      {
        userId: data.userId,
        bookId: data.bookId,
        notificationType: data.notificationType
      }
    );
    resolve(socket.emit('GET_ALL_NOTIFICATIONS', { itemsCountPerPage: 5, currentPage: 1 }));
    reject();
  });
  promise.then(() => {
    socket.on('GET_ALL_NOTIFICATIONS', (notifications) => {
      dispatch(getAllNotifications(notifications.rows, notifications.count));
    });
  });
};

export const getNotificationsAction = (data) => dispatch => {
  socket.emit('GET_ALL_NOTIFICATIONS', data);
  socket.on('GET_ALL_NOTIFICATIONS', (notifications) => {
    dispatch(getAllNotifications(notifications.rows, notifications.count));
  });
};

export const updateNotificationAction = (data) => dispatch => {
  socket.emit('UPDATE_NOTIFICATION', { id: data.id });
  socket.on('UPDATE_NOTIFICATION', () => {
    socket.emit('GET_ALL_NOTIFICATIONS', { itemsCountPerPage: 5, currentPage: 1 });
  });
  socket.on('GET_ALL_NOTIFICATIONS', (notifications) => {
    dispatch(getAllNotifications(notifications.rows, notifications.count));
  });
};

export default { getAllNotificationsAction };
