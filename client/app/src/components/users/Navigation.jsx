import React from 'react';
import { Link } from 'react-router-dom';
import WelcomeMessage from './WelcomeMessage.jsx';

class Navigation extends React.Component {
  componentDidMount() {
    $( document ).ready(function(){$('.button-collapse').sideNav();});
  }
  render() {
    return (
      <div>
        <nav className="button-collapse custom-nav-wrapper">
          <div className="nav-wrapper">
            <a href="index.html" className="brand-logo custom-logo-wrap">HelloBooks</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down custom-nav-list">
              <li><a href="">{this.props.about}</a></li>
              <li><a href="/signup">{this.props.contact}</a></li>
              <li><Link to='signin'>{this.props.signup}</Link></li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
export default Navigation;
