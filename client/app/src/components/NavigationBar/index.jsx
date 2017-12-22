import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import GuestLinks from './GuestLinks';
import UserLinks from './UserLinks';
import { signOutAction } from '../../actions/userActions';

const propTypes = {
  user: PropTypes.object.isRequired,
  signOutAction: PropTypes.func.isRequired,
  role: PropTypes.string,
  total: PropTypes.number.isRequired
};
const defaultProps = {
  total: 0,
};
/**It contains state and behaviours for NavigtionBar component
 *
 * @returns {object} jsx
 *
 * @class Navigation
 *
 * @extends {React.Component}
 */
export class NavigationBar extends React.Component {
  /**
   * Creates an instance of Navigation.
   * @param {object} props
   * @memberof Navigation
   */
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: false,
      total: 0
    };
  }
  /**It checks if a user is an admin before mounting
   * and also initializes modal component
   *
   * @returns {undefined}
   *
   * @memberof Navigation
   */
  componentDidMount() {
    const { $ } = window;
    if (this.props.role === 'admin') {
      this.setState({
        isAdmin: true
      });
    }
    $(document).ready(() => {
      $(".button-collapse").sideNav({
        closeOnClick: true
      });
    });
  }
  /**It sets on receiving next props
   *
   * @returns {undefined}
   *
   * @param {object} nextProps
   *
   * @memberof NavigationBar
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.total) {
      this.setState({ total: nextProps.total });
    }
    if (nextProps.role === 'admin') {
      this.setState({
        isAdmin: true
      });
    } else {
      this.setState({
        isAdmin: false
      });
    }
  }
  /**It initializes side nav on update
   *
   * @returns {undefined}
   *
   * @memberof Navigation
   */
  componentDidUpdate() {
    const { $ } = window;
    this.var = '';
    $(".button-collapse").sideNav({
      closeOnClick: true
    });
  }
  /**It handle sign out and call the appropriate actio
   *
 * @returns {undefined}
 *
 * @param {object} event
 *
 * @memberof DashboardHead
 */
  signOutAction(event) {
    event.preventDefault();
    this.props.signOutAction();
  }

  /**It returns nav element
   *
   * @returns {object} jsx
   *
   * @memberof Navigation
   */
  render() {
    const { isAuthenticated } = this.props.user;
    return (
      <div>
        <nav className="custom-nav-wrapper">
          <div className="container nav-wrapper">
            <Link to={isAuthenticated ? "#" : "/"}
              className="brand-logo custom-logo-wrap">
              HelloBooks
            </Link>
            <Link to={isAuthenticated ? "#" : "/"}
              data-activates="mobile-demo"
              className="button-collapse"
            >
              <i className="material-icons">menu</i>
            </Link>
            { isAuthenticated ?
              <UserLinks
                isAdmin={this.state.isAdmin}
                signOutAction={this.props.signOutAction}
                total={this.state.total}
              /> : <GuestLinks /> }
          </div>
        </nav>
      </div>
    );
  }
}
NavigationBar.propTypes = propTypes;
NavigationBar.defaultProps = defaultProps;

/**
 * It slices the state and returns user object and role string
 *
 * @param {object} state
 *
 * @returns {object} new state
*/
const mapStateToProps = (state) => ({
  user: state.userReducer,
  role: state.userReducer.user.role,
  total: state.notificationsReducer.total
});
export default connect(
  mapStateToProps,
  { signOutAction }
)(NavigationBar);
