import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getNotificationsAction } from '../../actions/notificationsAction';

const propTypes = {
  total: PropTypes.number.isRequired,
};
/**
 *
 *
 * @class NotificationIcon
 * @extends {React.Component}
 */
class NotificationIcon extends React.Component {
  /**
     * @returns {void}
     *
     * @memberof NotificationIcon
     */
  componentDidMount() {
    this.props.getNotifications();
  }
  /**
   *
   *
   * @returns {object} jsx
   * @memberof NotificationIcon
   */
  render() {
    const { total } = this.props;
    return (
      <div>
        <Link to="/notifications">
          <div>
            <i className="material-icons">
                    notifications
            </i>
          </div>
          {total && <div >{total}</div>}

        </Link>
      </div>
    );
  }
}
NotificationIcon.propTypes = propTypes;
const mapStateToProps = (state) => ({
  role: state.userReducer.user.role,
  total: state.notificationReducer.total
});
export default connect(mapStateToProps, {
  getNotifications: getNotificationsAction
})(NotificationIcon);
