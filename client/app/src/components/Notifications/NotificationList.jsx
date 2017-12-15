import React from 'react';
import TimeAgo from 'react-timeago';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';


const propTypes = {
  notifications: PropTypes.array.isRequired,
  updateNotification: PropTypes.func.isRequired
};
/**It returns a div element containing notifications list
 *
 *
 * @param {any} props
 * @returns {object} jsx
 */
function NotificationList({ notifications, updateNotification }) {
  return (
    <div>
      {isEmpty(notifications) ?
        <h5>There are no unread notifications</h5> :
        <div>
          <br />
          <div>
            <a
              className="btn right bc"
              onClick={() => updateNotification({})}>
        Mark all as read
            </a>
          </div>
          <br />
          <br />
          <ul>
            {notifications && notifications.map((notification) =>
              (<li key={notification.id} className="row">
                <div className="col s4">{notification.User.userName }
                  {" "}
                  { notification.notificationType === 'BOOK_RETURNED' ?
                    'returned' : 'borrowed'}
                  {" "}
                  { notification.Book.title}</div>
                <div className="col s2">
                  <TimeAgo date={notification.updatedAt} />
                </div>
                <div
                  className="col s2"
                  onClick={() => updateNotification({
                    id: notification.id
                  })}
                >
                  {notification.seen === 'unread' ?
                    'Mark as read' : ''}
                </div>
              </li>
              ))}
          </ul></div>}

    </div>);
}
NotificationList.propTypes = propTypes;
export default NotificationList;
