import models from '../models';

/**
 * Contains method for notification
 *
 * @class Notifications
 */
class Notifications {
  /**
     * Creates an instance of Notifications.
     * 
     * @param {any} io
     *
     * @memberof Notifications
     */
  constructor(io) {
    this.io = io;
  }
  /**
 * Sends notification
 *
 * @param {any} notificationType
 * @param {any} data
 *
 * @returns {string} returns string
 *
 * @memberof Notifications
 */
  sendNotification(notificationType, data) {
    this.io.to('admin').emit(notificationType, data);
  }
  /**
 * Get all notification
 *
 * @param {any} data
 *
 * @returns {object} returns onject
 *
 * @memberof Notifications
 */
  getAllNotifications(data) {
    const offset = data.itemsCountPerPage ?
      data.itemsCountPerPage * (data.currentPage - 1) : 0;
    const limit = data.itemsCountPerPage ? data.itemsCountPerPage : 5;
    const whereStatement = { seen: 'unread' };
    return models.Notification
      .findAndCountAll({
        attributes: ['id', 'notificationType', 'seen', 'updatedAt'],
        include: [{ model: models.Book, attributes: ['author', 'title'] },
          { model: models.User, attributes: ['userName'] }
        ],
        where: whereStatement,
        limit,
        offset,
        order: [['updatedAt', 'DESC']]
      })
      .then((notifications) => {
        this.sendNotification(
          'GET_ALL_NOTIFICATIONS',
          {
            count: notifications.count,
            rows: notifications.rows
          }
        );
      });
  }
  /**
  * add notification
  *
  * @param {any} data

  * @memberof Notifications

  @returns {undefined}
  */
  addNotification(data) {
    this.var = '';
    models.Notification.create({
      UserId: parseInt(data.userId, 10),
      BookId: parseInt(data.bookId, 10),
      notificationType: data.notificationType
    });
  }
  /**
 * Update a notification
 *
 * @param {any} data
 *
 * @returns {undefined}
 *
 * @memberof Notifications
 */
  updateNotification(data) {
    const whereStatement = {};
    if (data.id) {
      whereStatement.id = data.id;
    }
    return models.Notification.update(
      {
        seen: 'read'
      },
      {
        where: whereStatement
      }
    )
      .then(() => {
        this.sendNotification('UPDATE_NOTIFICATION', 'it was successfull');
      });
  }
}
export default Notifications;
