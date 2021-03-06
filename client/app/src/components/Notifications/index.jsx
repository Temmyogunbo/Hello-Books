import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Pagination from '../Pagination';
import PageNotFound from '../PageNotFound';
import {
  getNotificationsAction,
  updateNotificationAction
} from '../../actions/notificationsAction';
import NotificationList from './NotificationList';

const propTypes = {
  role: PropTypes.string.isRequired,
  notifications: PropTypes.array.isRequired,
  getNotifications: PropTypes.func.isRequired,
  updateNotification: PropTypes.func.isRequired,
  total: PropTypes.number,
  isAdmin: PropTypes.bool.isRequired,

};
const defaultProps = {
  notifications: [],
};
/**It contains methods and state for the Notifications component
 *
 *
 * @class Notifications
 *
 * @extends {React.Component}
 */
export class Notifications extends React.Component {
  /**
   * Creates an instance of Notifications.
   *
   * @param {object} props - it contains react props
   *
   * @memberof Notifications
   */
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      itemsCountPerPage: 5,
    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }
  /**It invokes an action that gets all notifications
   *
   * @returns{undefined}
   *
   * @memberof Notifications
   */
  componentDidMount() {
    this.props.getNotifications({
      currentPage: this.state.activePage,
      itemsCountPerPage: this.state.itemsCountPerPage,
    });
  }
  /**It handles page change and invokes notifications
   *
   * @returns {undefined}
   *
   * @param {number} pageNumber - it stores page number for notification page
   *
   * @memberof Notifications
   */
  handlePageChange(pageNumber) {
    this.setState({
      activePage: pageNumber,
    }, () => this.props.getNotifications({
      currentPage: this.state.activePage,
      itemsCountPerPage: this.state.itemsCountPerPage,
    }));
  }
  /**It returns a div element containing notification list
     *
     *
     * @returns {object} jsx
     *
     * @memberof Notifications
     */
  render() {
    const {
      notifications,
      updateNotification,
      total,
      isAdmin,
    } = this.props;
    return (
      <div className="container">
        {isAdmin ? <div>
          <NotificationList
            notifications={notifications}
            updateNotification={updateNotification}
          />
          {total ? <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={this.state.itemsCountPerPage}
            totalItemsCount={total}
            pageRangeDisplayed={5}
            handlePageChange={this.handlePageChange}
          /> : null}</div> :
          <PageNotFound />}


      </div>
    );
  }
}
Notifications.propTypes = propTypes;
Notifications.defaultProps = defaultProps;

/**
 * It slices the state and returns role, notifications, and total
 *
 * @param {object} state - application state object
 *
 * @returns {object} new state
*/
const mapStateToProps = (state) => ({
  role: state.userReducer.user.role,
  notifications: state.notificationsReducer.notifications,
  total: state.notificationsReducer.total
});
export default connect(mapStateToProps, {
  getNotifications: getNotificationsAction,
  updateNotification: updateNotificationAction
})(Notifications);
