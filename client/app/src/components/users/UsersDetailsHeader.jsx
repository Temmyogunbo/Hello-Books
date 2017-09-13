import React from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';

class UsersDetailsHeader extends React.Component {
  componentDidMount() {
    $(document).ready(() => { $(this.refs.buttonCollapse).sideNav(); });
  }
  render() {
    return (
      <div>
        <ul id="dropdown1" className="dropdown-content">
          <li><a href="">USername</a></li>
          <li><a href="#!">Sign out</a></li>
          <li className="divider"></li>
        </ul>
        <nav>
          <div className="nav-wrapper">
            <a href="#!" className="brand-logo">HelloBooks</a>
            <ul className="right hide-on-med-and-down">
              <li><a href="">PROFILE</a></li>
              <li><a href="">BORROWED BOOKS</a></li>
              <li><a href="">HISTORY</a></li>
              <li><a
               className="dropdown-button"
               href="#!" data-activates="dropdown1">
                <i
                className="material-icons right button-collapse" ref="buttonCollapse">arrow_drop_down</i></a></li>
            </ul>
            <ul className="" id="mobile-demo">
              <li><a href="">PROFILE</a></li>
              <li><a href="">BORROWED BOOKS</a></li>
              <li><a href="">HISTORY</a></li>
              <li><a href="">Mobile</a></li>
              <li><a
                className="dropdown-button"
                href="#!" data-activates="mobile-demo">
                <i
                  className="material-icons right button-collapse" ref="buttonCollapse">arrow_drop_down</i></a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
export default UsersDetailsHeader;
