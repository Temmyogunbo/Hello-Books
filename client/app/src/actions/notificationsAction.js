import socket from '../socket';
import {
  GET_ALL_NOTIFICATIONS,
} from '../constants/actionTypes';

/**Dispatched notifications and total action
 *
 * @param {any} notifications
 * @param {any} total
 *
 * @return {object} returns object
 */
const getAllNotifications = (notifications, total) => ({
  type: GET_ALL_NOTIFICATIONS,
  notifications,
  total
});

/**It returns all notifications object
 *
* @return {object} - returns an object of notifications

* @param {any} data
@param {any} dispatch
*/
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
    resolve(socket.emit(
      'GET_ALL_NOTIFICATIONS',
      { itemsCountPerPage: '', currentPage: '' }
    ));
    reject();
  });
  promise.then(() => {
    socket.on('GET_ALL_NOTIFICATIONS', (notifications) => {
      dispatch(getAllNotifications(notifications.rows, notifications.count));
    });
  });
};

/**It returns all notifications object
 *
* @return {object} - returns

* @param {any} data
@param {any} dispatch
*/
export const getNotificationsAction = (data) => dispatch => {
  socket.emit('GET_ALL_NOTIFICATIONS', data);
  socket.on('GET_ALL_NOTIFICATIONS', (notifications) => {
    dispatch(getAllNotifications(notifications.rows, notifications.count));
  });
};


/**It returns all notifications object and upadate a particular notification
 *
* @return {object} - returns an object of category

* @param {any} data
@param {any} dispatch
*/
export const updateNotificationAction = (data) => dispatch => {
  socket.emit('UPDATE_NOTIFICATION', { id: data.id });
  socket.on('UPDATE_NOTIFICATION', () => {
    socket.emit(
      'GET_ALL_NOTIFICATIONS',
      { itemsCountPerPage: '', currentPage: '' }
    );
  });
  socket.on('GET_ALL_NOTIFICATIONS', (notifications) => {
    dispatch(getAllNotifications(notifications.rows, notifications.count));
  });
};

export default {
  getAllNotificationsAction,
  updateNotificationAction,
  getNotificationsAction
};
