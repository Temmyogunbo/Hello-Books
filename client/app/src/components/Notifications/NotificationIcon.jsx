import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const propTypes = {
  total: PropTypes.number.isRequired,
};

/**
 *It returns a div element
 *
 * @param {any} {total}
 * @returns {object} jsx
 */
function NotificationIcon({ total }) {
  return (
    <div className="row" style={{height: "10px"}}>
      <Link to="/notifications">
        <div className="col s4">
          <i className="material-icons">
            notifications
          </i>
        </div>
        <div className="col s2 notif-icon" style={{ color: 'red' }}>
          <div >{total && total}</div>
        </div>
      </Link>
    </div>
  );
}

NotificationIcon.propTypes = propTypes;


export default NotificationIcon;
