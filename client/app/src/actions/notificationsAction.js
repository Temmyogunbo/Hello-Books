import socket from '../socket';
import {
  GET_ALL_NOTIFICATIONS,
  GET_ALL_NOTIFICATIONS_ERROR
} from '../constants/actionTypes';

const getAllNotifications = (notifications, total) => ({
  type: GET_ALL_NOTIFICATIONS,
  notifications,
  total
});
const getAllNotificationsError = (error) => ({
  type: GET_ALL_NOTIFICATIONS_ERROR,
  error
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
    resolve(socket.emit('GET_ALL_NOTIFICATIONS'));
    reject(socket.emit('NOTIFICATION_FAILED'));
  });
  promise.then(() => {
    socket.on('GET_ALL_NOTIFICATIONS', (notifications) => {
      console.log('norr', notifications);
      dispatch(getAllNotifications(notifications.rows, notifications.count));
    });
  })
    .catch(() => {
      socket.on('NOTIFICATION_FAILED', (error) => {
        console.log('norr', error);
        dispatch(getAllNotificationsError(error));
      });
    });
};

export const getNotificationsAction = () => dispatch => {
  socket.emit('GET_ALL_NOTIFICATIONS');
  socket.on('GET_ALL_NOTIFICATIONS', (notifications) => {
    console.log('norr', notifications);
    dispatch(getAllNotifications(notifications.rows, notifications.count));
  });
  socket.on('NOTIFICATION_FAILED', (error) => {
    console.log('norr', error);
    dispatch(getAllNotificationsError(error));
  });
};

export const updateNotificationAction = (data) => dispatch => {
  console.log('finally made it', data)
  socket.emit('UPDATE_NOTIFICATION', { id: data.id });
  socket.on('UPDATED_NOTIFICATION', () => {
    socket.emit('GET_ALL_NOTIFICATIONS');
  });
  socket.on('GET_ALL_NOTIFICATIONS', (notifications) => {
    dispatch(getAllNotifications(notifications.rows, notifications.count));
  });
};

export default { getAllNotificationsAction };
