import db from '../../../models';

/**
 * @returns {undefined}
 *
 * @class Notifications
 */
class Notifications {
  /**
   * Creates an instance of Notifications.
   * @param {any} io
   * @memberof Notifications
   */
  constructor(io) {
    this.io = io;
  }
  /**
 * @returns {void}
 *
 * @param {any} notificationType
 * @param {any} data
 * @memberof Notifications
 */
  sendNotification(notificationType, data) {
    this.io.to('admin').emit(notificationType, data);
  }
  /**
  *
  *
  * @returns {object} an instance of notifiacation model
  * @memberof Notifications
  */
  getAllNotifications() {
    const whereStatement = { seen: 'unread' };
    return db.Notification
      .findAndCountAll({
        attributes: ['id', 'notificationType', 'seen', 'updatedAt'],
        include: [{ model: db.Book, attributes: ['author', 'title'] },
          { model: db.User, attributes: ['userName'] }
        ],
        where: whereStatement,
        limit: 10,
        order: [['updatedAt', 'DESC']]
      })
      .then((notifications) => {
        this.sendNotification(
          'GET_ALL_NOTIFICATIONS',
          {
            count: notifications.count,
            rows: notifications.rows.slice(0, 10)
          }
        );
      })
      .catch((err) => {
        this.sendNotification('CANNOT_ADD_NOTIFICATION', err);
        return false;
      });
  }
  /**
 *
 *
 * @static
 * @param {any} data
 * @returns {object} an instance of Notification
 * @memberof Notifications
 */
  addNotification(data) {
    console.log('++++++');
    db.Notification.create({
      UserId: parseInt(data.userId, 10),
      BookId: parseInt(data.bookId, 10),
      notificationType: data.notificationType
    })
      .then(() => {
        this.sendNotification('ADDED_NEW_NOTIFICATION', 'it was successfull');
        return true;
      })
      .catch(() => {
        this.sendNotification(
          'NOTIFICATION_FAILED',
          new Error('Notification was not succesSful')
        );
        return false;
      });
  }
  /**
   * @returns {object} an instance of Notification model
   *
   * @param {any} data
   * @memberof Notifications
   */
  updateNotification(data) {
    let whereStatement = {};
    if (data.id) {
      whereStatement.id = data.id;
    }
    return db.Notification.update(
      {
        seen: 'read'
      },
      {
        where: whereStatement
      }
    )
      .then((list) => {
        this.sendNotification('UPDATED_NOTIFICATION', 'it was successfull');
      })
      .catch(() => {
        this.sendNotification(
          'NOTIFICATION_FAILED',
          new Error('Notification was not successful')
        );
      });
  }
}
export default Notifications;
