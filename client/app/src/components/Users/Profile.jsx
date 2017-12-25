import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  user: PropTypes.object.isRequired,
};

/**It returns a div element containing user profile
 *
 * @param {object} props
 *
 * @returns {object} jsx
 */
function Profile({ user }) {
  const {
    fullName,
    userName,
    email,
    membership,
  } = user;
  return (
    <div className="col s9 mt-2">
      <div className="hide-on-small-only">
        <div>
          <h5
            className="bc s9"
            style={{ fontSize: "25px", color: "white" }}>My Profile
          </h5>
        </div>
        <ul>
          <li>
            <span className="fs-2 mt-2">Full Name</span>
            <span className="ml-5 mt-2 fs-1">{fullName}</span>
          </li>
          <li>
            <span className="fs-2 mt-2">Username</span>
            <span className="ml-5 mt-2 fs-1">{userName}</span>
          </li>
          <li>
            <span className="fs-2 mt-2">Email</span>
            <span className="ml-5 mt-2 fs-1">{email}</span>
          </li>
          <li>
            <span className="fs-2 mt-2">Membership</span>
            <span className="ml-5 mt-2 fs-1">{membership}</span>
          </li>
        </ul>
        <br />
        <div>
          <div className="bc-2 row">
            <div
              className="col s9 fs-2"
              style={{ fontSize: "25px", color: "white" }}>
              Change Password
            </div>
            <a
              className="col s3 btn modal-trigger brown darken-4 edit-button"
              href="#change-password"
            >
              EDIT
            </a>

          </div>
          <ul>
            <li>
              <span className="fs-2 mt-2">Email</span>
              <span className="ml-5 mt-2 fs-1">{email}</span>
            </li>
            <li>
              <span className="fs-2 mt-2">Password</span>
              <span className="ml-5 mt-2 fs-2">...................</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="hide-on-med-and-up mt-2">
        <div>
          <h5
            className="bc s9"
            style={{ fontSize: "25px", color: "white" }}>My Profile
          </h5>
        </div>
        <ul>
          <li>
            <span className="fs-1 mr-2">Full Name</span>
            <span>{fullName}</span>
          </li>
          <li>
            <span className="fs-1 mr-2">Username</span>
            <span>{userName}</span>
          </li>
          <li>
            <span className="fs-1 mr-2">Email</span>
            <span>{email}</span>
          </li>
          <li>
            <span className="fs-1 mr-2">Membership</span>
            <span>{membership}</span>
          </li>
        </ul>
        <br />
        <div>
          <div className="bc-2 row">
            <div
              className="col s9 fs-2"
              style={{ fontSize: "15px", color: "white" }}>
              Change Password
            </div>
            <a
              className="col s3 btn modal-trigger brown darken-4 edit-button"
              href="#change-password"
            >
              EDIT
            </a>

          </div>
          <ul>
            <li>
              <span className="fs-1 mr-2">Email</span>
              <span>{email}</span>
            </li>
            <li>
              <span className="fs-1 mr-2">Password</span>
              <span>...................</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
Profile.propTypes = propTypes;
export default Profile;
