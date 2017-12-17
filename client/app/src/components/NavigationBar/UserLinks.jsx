import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import NotificationIcon from '../Notifications/NotificationIcon';


const propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  signOutAction: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired
};

/**it returns unordered list element
 *
 * @param {any} props
 *
 * @returns {object} jsx
 */
function UserLinks({ isAdmin, signOutAction, total }) {
  return (
    <div>
      <ul
        id="nav-mobile"
        className="right hide-on-med-and-down custom-nav-list"
      >
        {isAdmin ? <li>
          <NotificationIcon total={total}/>
        </li> : <li>
          <Link to="/history">
              History
          </Link>
        </li>}
        <li>
          <Link to="/collections">
                        Collections
          </Link>
        </li>

        <li>
          <Link to="/" onClick={() => signOutAction()} >
                        Sign out
          </Link>
        </li>
      </ul>
      <ul
        id="mobile-demo"
        className="side-nav"
      >
        {isAdmin ? <li>
          <NotificationIcon total={total}/>
        </li> : <li>
          <Link to="/history">
              History
          </Link>
        </li>}

        <li>
          <Link to="/collections">
                        Collection
          </Link>
        </li>

        <li>
          <Link to="/" onClick={() => signOutAction()}>
                        Sign out
          </Link>
        </li>
      </ul>
    </div>
  );
}
UserLinks.propTypes = propTypes;

export default UserLinks;
