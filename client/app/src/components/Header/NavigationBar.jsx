import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import $ from 'jquery';
import GuestLinks from './GuestLinks';
import UserLinks from './UserLinks';
import { signOutAction } from '../../actions/userActions';

const propTypes = {
  user: PropTypes.object.isRequired,
  signOutAction: PropTypes.func.isRequired
};
/**
 *
 * @returns {object} jsx
 * @class Navigation
 * @extends {React.Component}
 */
class NavigationBar extends React.Component {
  /**
   * Creates an instance of Navigation.
   * @param {any} props
   * @memberof Navigation
   */
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: false
    };
  }
  /**
*@returns {undefined}
*
* @param {any} nextProps
* @memberof NavigationBar
*/
  componentWillMount() {
    if (this.props.isAdmin === 'admin') {
      this.setState({
        isAdmin: true
      });
    }
  }
  /**
   * @returns {void}
   *
   * @memberof Navigation
   */
  componentDidMount() {
    this.var = '';
    $(document).ready(() => {
      $(".button-collapse").sideNav({
        closeOnClick: true
      });
    });
  }
  /**
   * @returns {undefined}
   *
   * @param {any} nextProps
   * @memberof NavigationBar
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.isAdmin === 'admin') {
      this.setState({
        isAdmin: true
      });
    }
  }
  /**
   * @returns {void}
   *
   * @memberof Navigation
   */
  componentDidUpdate() {
    this.var = '';
    $(".button-collapse").sideNav({
      closeOnClick: true
    });
  }
  /**
 * @returns {void}
 *
 * @param {any} event
 * @memberof DashboardHead
 */
  signOutAction(event) {
    event.preventDefault();
    this.props.signOutAction();
  }
  /**
   *
   * @returns {object} jsx
   * @memberof Navigation
   */
  render() {
    const { isAuthenticated } = this.props.user;
    return (
      <div>
        <nav className="custom-nav-wrapper">
          <div className="container nav-wrapper">
            <Link to={isAuthenticated ? "#" : "/"} className="brand-logo custom-logo-wrap">
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
                signOutAction={signOutAction}
              /> : <GuestLinks /> }
          </div>
        </nav>
      </div>
    );
  }
}
NavigationBar.propTypes = propTypes;
const mapStateToProps = (state) => ({
  user: state.userReducer,
  isAdmin: state.userReducer.user.role
});
export default connect(mapStateToProps, { signOutAction })(NavigationBar);
