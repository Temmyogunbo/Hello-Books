import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const propTypes = {
  total: PropTypes.number.isRequired,
};
const defaultProps = {
  total: 0,
};
/**
 *It returns a div element
 *
 * @param {any} {total}
 * @returns {object} jsx
 */
function NotificationIcon({ total }) {
  return (
    <div className="row">
      <Link to="/notifications">
        <div className="col s4">
          <i className="material-icons">
            notifications
          </i>
        </div>
        <div className="col s2 notif-icon" style={{ color: 'red' }}>
          <div >{total === 0 ? null : total}</div>
        </div>
      </Link>
    </div>
  );
}

NotificationIcon.propTypes = propTypes;
NotificationIcon.defaultProps = defaultProps;


export default NotificationIcon;
