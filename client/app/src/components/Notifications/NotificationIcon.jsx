import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const propTypes = {
  total: PropTypes.number.isRequired,
};

/**
 *It returns a div element
 *
 * @param {number} total - it stores total number for notifications
 *
 * @returns {object} jsx
 */
function NotificationIcon({ total }) {
  return (
    <Link to="/notifications" className="row">
      <i className="material-icons col s2 m2 l3">
            notifications
      </i>
      <h6
        className="col s2 m2 l2 pull-s2 pull-m2"
        style={{ color: "red" }}
      >
        {total === 0 ? null : total}
      </h6>

    </Link>
  );
}

NotificationIcon.propTypes = propTypes;


export default NotificationIcon;
