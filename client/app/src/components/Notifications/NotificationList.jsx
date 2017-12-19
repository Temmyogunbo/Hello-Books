
import React from 'react';
import TimeAgo from 'react-timeago';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';

import Button from '../Button';

const propTypes = {
  notifications: PropTypes.array.isRequired,
  updateNotification: PropTypes.func.isRequired
};

/**It returns a div elemnent notifications list
 *
 * @param {any} notifications
 * @param {any} updateNotification
 *
 * @returns {object} jsx
 */
function NotificationList({
  notifications,
  updateNotification
}) {
  return (
    <div className="row" >
      <br />
      {isEmpty(notifications) ?
        <h5>There are no unread notifications</h5> :
          <ul>
            {notifications && notifications.map((notification) => (
              <li
                key={notification.id}
                className="col s12 m6 l4"
              >
                <h6><strong>
                  Book {notification.notificationType === 'BOOK_RETURNED' ?
                    'returned' : 'borrowed'}
                </strong>
                </h6>
                <div className="card horizontal">

                  <div className="card-stacked">
                    <div>
                      <TimeAgo
                        className="right"
                        style={{ padding: "0 10px 0 10px" }}
                        date={notification.updatedAt}
                      />
                    </div>
                    <div className="card-content">
                      <p>{notification.User.userName }
                        {" "}
                        {notification.notificationType === 'BOOK_RETURNED' ?
                          'returned' : 'borrowed'}
                        {" "}

                        { notification.Book.title}</p>
                    </div>
                    <div
                      className="card-action clickable"
                      onClick={() => updateNotification({
                        id: notification.id
                      })}
                    >
                      {notification.seen === 'unread' ?
                        'Mark as read' : ''}
                    </div>
                  </div>
                </div>
              </li>))}
          </ul>
      }
    </div>
  );
}
NotificationList.propTypes = propTypes;
export default NotificationList;
