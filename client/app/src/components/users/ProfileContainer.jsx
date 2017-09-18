import React from 'react';
import Proptypes from 'prop-types';
import Button from './ButtonComponent';

class ProfileContainer extends React.Component {
  render() {
    console.log('i made it', this.props)
    return (
      <table className="users-profile">
        <thead>
          <tr>
            <th>My Profile</th>
            <th><Button name="EDIT" /></th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Full Name</td>
            <td>{this.props.fullName}</td>
          </tr>
          <tr>
            <td>Username</td>
            <td>{this.props.userName}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{this.props.email}</td>
          </tr>
        </tbody>
      </table>
    );
  }
}
export default ProfileContainer;
