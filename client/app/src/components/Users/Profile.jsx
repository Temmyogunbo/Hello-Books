import React from 'react';

const Profile = (props) => {
  const {
    fullName,
    userName,
    email
  } = props.user;
  return (
    <div className="col s9 mt-2">
      <div>
        <div>
          <h5 className="bc s9">My Profile</h5>
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
        <div>
          <div>
            <h5 className="bc">{'Update Email & Password'}</h5>
          </div>
          <ul>
            <li>
              <span className="fs-2 mt-2">{'Emai'}l</span>
              <span className="ml-5 mt-2 fs-1">{email}</span>
            </li>
            <li>
              <span className="fs-2 mt-2">{'Password'}</span>
              <span className="ml-5 mt-2 fs-2">{'...................'}</span>
            </li>
          </ul>
        </div>
      </div>
      <div>Profile picture <img  role="presentation" /></div>
    </div>
  );
};
export default Profile;
