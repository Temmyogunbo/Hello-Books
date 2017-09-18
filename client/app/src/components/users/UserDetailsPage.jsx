import React from 'react';
import { connect } from 'react-redux';
import UsersDetailsHeader from './UsersDetailsHeader';
import ProfileContainer from './ProfileContainer';

class UserDetailsPage extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <UsersDetailsHeader
          profileaddress="/user"
          profile="PROFILE"
          historyaddress="/history"
          history="HISTORY"
        />
        <ProfileContainer {...user} />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  };
};

export default connect(mapStateToProps)(UserDetailsPage);
