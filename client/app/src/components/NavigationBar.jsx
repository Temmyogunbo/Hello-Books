import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import $ from 'jquery';


import { signOutAction } from '../actions/userActions';

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
   * @returns {void}
   *
   * @memberof Navigation
   */
  componentDidMount() {
    this.var = "";
    $(document).ready(() => {
      $(".button-collapse").sideNav({
        closeOnClick: true
      });
    });
    if (this.props.user.user.role === 'admin') {
      this.setState({
        isAdmin: true
      });
    }
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
   *
   * @returns {object} jsx
   * @memberof Navigation
   */
  render() {
    const { isAuthenticated } = this.props.user;
    const guestLinks = (
      <div>
        <ul
          id="nav-mobile"
          className="right hide-on-med-and-down custom-nav-list"
        >
          <li><Link to="#">About us</Link></li>
          <li><Link to="#">Contact us</Link></li>
          <li><Link to="/signin">Log in</Link></li>
          <li><Link to="/signup">Sign up</Link></li>
        </ul>
        <ul
          id="mobile-demo"
          className="side-nav"
        >
          <li><Link to="#">About us</Link></li>
          <li><Link to="#">Contact us</Link></li>
          <li><Link to="/signin">Log in</Link></li>
          <li><Link to="/signup">Sign up</Link></li>
        </ul>
      </div>
    );
    const userLinks = (
      <div>
        <ul
          id="nav-mobile"
          className="right hide-on-med-and-down custom-nav-list"
        >
          <li>
            <Link to="/collections">
              {"Collections"}
            </Link>
          </li>
          <li>
            <Link to="/history">
              {"History"}
            </Link>
          </li>
          <li>
            <Link to="/" onClick={this.signOutAction.bind(this)} >
            Sign out
            </Link>
          </li>
        </ul>
        <ul
          id="mobile-demo"
          className="side-nav"
        >
          <li>
            <Link to="/collections">
              {"Book Collection"}
            </Link>
          </li>
          <li>
            <Link to="/history">
              {"History"}
            </Link>
          </li>
          <li>
            <Link to="/" onClick={this.signOutAction.bind(this)}>
            Sign out
            </Link>
          </li>
        </ul>
      </div>
    );
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
            { isAuthenticated ? userLinks : guestLinks }
          </div>
        </nav>
      </div>
    );
  }
}
NavigationBar.propTypes = propTypes;
const mapStateToProps = (state) => ({
  user: state.userReducer
});
export default connect(mapStateToProps, { signOutAction })(NavigationBar);
