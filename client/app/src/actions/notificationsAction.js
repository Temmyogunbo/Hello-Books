import socket from '../socket';
import {
  GET_ALL_NOTIFICATIONS,
} from '../constants/actionTypes';

/**Dispatched notifications and total action
 *
 * @param {object} notifications - notifications object
 * @param {number} total - total number of notifcations
 *
 * @return {object} returns object
 */
const getAllNotifications = (notifications, total) => ({
  type: GET_ALL_NOTIFICATIONS,
  notifications,
  total,
});

/**It returns all notifications object
 *
* @return {object} - returns an object of notifications

* @param {object} newNotifications - newNotifications object
* @param {function} dispatch
*/
export const getAllNotificationsAction = (newNotifications, dispatch) => {
  const promise = new Promise((resolve, reject) => {
    socket.emit(
      'ADD_NEW_NOTIFICATION',
      {
        userId: newNotifications.userId,
        bookId: newNotifications.bookId,
        notificationType: newNotifications.notificationType,
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
* @return {object} - return object

* @param {object} allNotifications - allNotifications object
@param {function} dispatch
*/
export const getNotificationsAction = (allNotifications) => dispatch => {
  socket.emit('GET_ALL_NOTIFICATIONS', allNotifications);
  socket.on('GET_ALL_NOTIFICATIONS', (notifications) => {
    dispatch(getAllNotifications(notifications.rows, notifications.count));
  });
};


/**It returns all notifications object and upadate a particular notification
 *
* @return {object} - returns an object of category

* @param {object} updateNotification - updateNotefication object
@param {function} dispatch
*/
export const updateNotificationAction = (updateNotification) => dispatch => {
  socket.emit('UPDATE_NOTIFICATION', { id: updateNotification.id });
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
  getNotificationsAction,
};
