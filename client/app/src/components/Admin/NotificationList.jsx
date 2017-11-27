import React from 'react';
import TimeAgo from 'react-timeago';
import isEmpty from 'lodash/isEmpty';

const NotificationList = (props) => (
  <div>
    {isEmpty(props.notifications) ? <h5>There are no unread notifications</h5> :
      <div>
        <br />
        <div>
          <a
            className="btn right"
            onClick={() => props.updateNotification({})}>
        Mark all as read
          </a>
        </div>
        <br />
        <br />
        <ul>
          {props.notifications && props.notifications.map((notification) =>
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
                onClick={() => props.updateNotification({ id: notification.id })}
              >
                {notification.seen === 'unread' ?
                  <i className="material-icons">check</i> : ''}
              </div>
            </li>
            ))}
        </ul></div>}

  </div>);
export default NotificationList;
