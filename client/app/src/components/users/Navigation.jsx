import React from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import WelcomeMessage from './WelcomeMessage.jsx';

class Navigation extends React.Component {
  componentDidMount() {
    $(document).ready(() => { $(this.refs.buttonCollapse).sideNav(); });
  }
  render() {
    return (
      <div>
        <nav className="custom-nav-wrapper">
          <div className="nav-wrapper">
            <Link to="/" className="brand-logo custom-logo-wrap">HelloBooks</Link>
            <a href="/"
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
              <li><Link to="">{this.props.about}</Link></li>
              <li><Link to="">{this.props.contact}</Link></li>
              <li><Link to={this.props.whereTo}>{this.props.sign}</Link></li>
            </ul>
            <ul
              id="mobile-demo"
              className="side-nav"
            >
              <li><a href="">{this.props.about}</a></li>
              <li><a href="">{this.props.contact}</a></li>
              <li><Link to={this.props.whereTo}>{this.props.sign}</Link></li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
export default Navigation;
