import React from 'react';
/**
 *
 *
 * @param {any} props
 * @returns {object} jsx
 */
function Profile(props) {
  const {
    fullName,
    userName,
    email
  } = props.user;
  return (
    <div className="col s9 mt-2">
      <div>
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
              className="col s3 btn modal-trigger brown darken-4"
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
    </div>
  );
}
export default Profile;
