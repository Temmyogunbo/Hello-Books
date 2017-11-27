import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getNotificationsAction, updateNotificationAction } from '../../actions/notificationsAction';
import NotificationList from './NotificationList';

const propTypes = {
  role: PropTypes.string.isRequired,
  notifications: PropTypes.array.isRequired,
  getNotifications: PropTypes.func.isRequired

};
/**
 *
 *
 * @class Notifications
 * @extends {React.Component}
 */
class Notifications extends React.Component {
  /**
   * @returns {void}
   *
   * @memberof Notifications
   */
//     componentDidMount() {
//     console.log('i do fire');
//     this.props.getNotifications();
//   }

  /**
     *
     *
     * @returns {object} jsx
     * @memberof Notifications
     */
  render() {
    const { notifications, updateNotification } = this.props;
    console.log(notifications, this.props.updateNotification);
    return (
      <div className="container">
        <NotificationList
          notifications={notifications}
          updateNotification={updateNotification}
        />
      </div>
    );
  }
}
Notifications.propTypes = propTypes;
const mapStateToProps = (state) => ({
  role: state.userReducer.user.role,
  notifications: state.notificationReducer.notifications
});
export default connect(mapStateToProps, {
  getNotifications: getNotificationsAction,
  updateNotification: updateNotificationAction
})(Notifications);
