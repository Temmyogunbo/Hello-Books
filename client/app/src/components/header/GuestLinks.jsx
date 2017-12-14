import React from 'react';
import { Link } from 'react-router-dom';

/**
 *
 *
 * @returns {object} jsx
 */
function GuestLinks() {
  return (
    <div>
      <ul
        id="nav-mobile"
        className="right hide-on-med-and-down custom-nav-list"
      >
        <li><Link to="/signin">Log in</Link></li>
        <li><Link to="/signup">Sign up</Link></li>
      </ul>
      <ul
        id="mobile-demo"
        className="side-nav"
      >
        <li><Link to="/signin">Log in</Link></li>
        <li><Link to="/signup">Sign up</Link></li>
      </ul>
    </div>
  );
}
export default GuestLinks;
