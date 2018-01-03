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
     * @param {object} io
     *
     * @memberof Notifications
     */
  constructor(io) {
    this.io = io;
  }
  /**
 * Sends notification
 *
 * @param {string} notificationType - type of notification
 * @param {object} notification - notification object
 *
 * @returns {string} returns string
 *
 * @memberof Notifications
 */
  sendNotification(notificationType, notification) {
    this.io.to('admin').emit(notificationType, notification);
  }
  /**
 * Get all notification
 *
 * @param {object} notifications - notifications object
 *
 * @returns {object} returns onject
 *
 * @memberof Notifications
 */
  getAllNotifications(notifications) {
    const offset = notifications.itemsCountPerPage ?
      notifications.itemsCountPerPage * (notifications.currentPage - 1) : 0;
    const limit = notifications.itemsCountPerPage ?
      notifications.itemsCountPerPage : 5;
    const whereStatement = { seen: 'unread' };
    return models.Notification
      .findAndCountAll({
        attributes: ['id', 'notificationType', 'seen', 'updatedAt'],
        include: [{ model: models.Book, attributes: ['author', 'title'] },
          { model: models.User, attributes: ['userName'] },
        ],
        where: whereStatement,
        limit,
        offset,
        order: [['updatedAt', 'DESC']],
      })
      .then((returnedNotifications) => {
        this.sendNotification(
          'GET_ALL_NOTIFICATIONS',
          {
            count: returnedNotifications.count,
            rows: returnedNotifications.rows,
          },
        );
      });
  }
  /**
  * add notification
  *
  * @param {object} notification

  * @memberof Notifications

  @returns {undefined}
  */
  addNotification(notification) {
    this.var = '';
    models.Notification.create({
      UserId: parseInt(notification.userId, 10),
      BookId: parseInt(notification.bookId, 10),
      notificationType: notification.notificationType,
    });
  }
  /**
 * Update a notification
 *
 * @param {object} updateNotification
 *
 * @returns {undefined}
 *
 * @memberof Notifications
 */
  updateNotification(updateNotification) {
    const whereStatement = {};
    if (updateNotification.id) {
      whereStatement.id = updateNotification.id;
    }
    return models.Notification.update(
      {
        seen: 'read',
      },
      {
        where: whereStatement,
      },
    )
      .then(() => {
        this.sendNotification('UPDATE_NOTIFICATION', 'it was successfull');
      });
  }
}
export default Notifications;
