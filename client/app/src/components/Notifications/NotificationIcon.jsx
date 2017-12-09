import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const propTypes = {
  total: PropTypes.number.isRequired,
};
const defaultProps = {
  total: 0,
};
/**
 *
 *
 * @class NotificationIcon
 * @extends {React.Component}
 */
class NotificationIcon extends React.Component {
  /**
   *
   *
   * @returns {object} jsx
   * @memberof NotificationIcon
   */
  render() {
    const { total } = this.props;
    return (
      <div className="row">
        <Link to="/notifications">
          <div className="col s4">
            <i className="material-icons">
                    notifications
            </i>
          </div>
          <div className="col s2 notif-icon" style={{ color: 'red' }}>
            <div >{total === 0 ? null : total}</div>
          </div>
        </Link>
      </div>
    );
  }
}
NotificationIcon.propTypes = propTypes;
NotificationIcon.defaultProps = defaultProps;

const mapStateToProps = (state) => ({
  role: state.userReducer.user.role,
  total: state.notificationsReducer.total
});
export default connect(mapStateToProps, null)(NotificationIcon);
