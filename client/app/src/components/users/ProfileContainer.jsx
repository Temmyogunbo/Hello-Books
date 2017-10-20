import React from 'react';
import Proptypes from 'prop-types';
import Button from './ButtonComponent';

class ProfileContainer extends React.Component {
  render() {
    return (
              <div className="wrap-profile">
                <h4>My Profile</h4>
                <button>EDIT</button>
                <ul>
                  <li>
                    <h4>Full Name</h4>
                    <div>{this.props.fullName}</div>
                  </li>
                  <li>
                    <h4>Username</h4>
                    <div>{this.props.userName}</div>
                  </li>
                  <li>
                    <h4>Email</h4>
                    <div>{this.props.email}</div>
                  </li>
                </ul>
              </div>
    );
  }
}
export default ProfileContainer;
