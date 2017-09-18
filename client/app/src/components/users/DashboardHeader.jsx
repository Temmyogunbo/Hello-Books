import React from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signOutAction } from '../../actions/userActions';

class DashboardHead extends React.Component {
  componentDidMount() {
    $(document).ready(() => { $(this.refs.buttonCollapse).sideNav(); });
  }
  signOutAction(event) {
    event.preventDefault();
    this.props.signOutAction();
  }
  render() {
    return (
      <nav className="custom-nav-wrapper">
        <div className="nav-wrapper">
          <a href="" className="brand-logo custom-logo-wrap">HelloBooks</a>
          <a href=""
            data-activates="mobile-demo"
            className="button-collapse"
            ref="buttonCollapse"
          >
            <i className="material-icons">menu</i>
          </a>
          <ul
            id="nav-mobile"
            className="right hide-on-med-and-down custom-nav-list"
          >
            <li><a href="">Help</a></li>
            <li><a href={this.props.address}>{this.props.user.userName}</a></li>
            <li><Link to="/" onClick={this.signOutAction.bind(this)} >Sign out</Link></li>
          </ul>
          <ul
            id="mobile-demo"
            className="side-nav"
          >
            <li><a href="">Help</a></li>
            <li><a href={this.props.address}>{this.props.user.userName}</a></li>
            <li><Link to="/" onClick={this.signOutAction.bind(this)}>Sign out</Link></li>
          </ul>
        </div>
      </nav>
    );
  }
}
DashboardHead.PropTypes = {
  signOutAction: PropTypes.func.isRequired,
  userName: PropTypes.object.isRequired
};
const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user
  };
};

export default connect(mapStateToProps, { signOutAction })(DashboardHead);
