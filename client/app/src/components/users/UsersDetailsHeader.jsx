import React from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signOutAction } from '../../actions/userActions';

class UsersDetailsHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eachDetails: 'PROFILE'
    };
    this.handleUpdate = this.handleUpdate.bind(this);
    this.signOutAction = this.signOutAction.bind(this);
  }
  signOutAction(event) {
    event.preventDefault();
    this.props.signOutAction();
  }

  handleUpdate(details) {
    this.setState(() => {
      return {
        eachDetails: details
      };
    });
  }
  componentDidMount() {
    $(document).ready(() => { $(this.refs.buttonCollapse).sideNav(); });
  }

  render() {
    return (
      <div>
        <nav className="users-head-details">
          <div className="nav-wrapper">
            <Link to="" className="brand-logo custom-logo-wrap">HelloBooks</Link>
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
              <li>
                <Link to={this.props.profileaddress}>         {this.props.profile}
                </Link>
              </li>
              <li>
                <Link to={this.props.historyaddress}>  {this.props.historyHead}
                </Link>
              </li>
              <li>
                <Link to="/" onClick={this.signOutAction.bind(this)}>
                   Sign out
                </Link>
              </li>
            </ul>
            <ul
              id="mobile-demo"
              className="side-nav"
            >
              <li>
                <Link to={this.props.profileaddress}>         {this.props.profile}
                </Link>
              </li>
              <li>
                <Link to={this.props.historyaddress}>  {this.props.historyHead}
                </Link>
              </li>
              <li>
                <Link to="/" onClick={this.signOutAction.bind(this)}>
                Sign out
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default connect(null, { signOutAction })(UsersDetailsHeader);
