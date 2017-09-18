import React from 'react';
import { connect } from 'react-redux';
import HistoryContainer from './HistoryContainer';
import PropTypes from 'prop-types';
import UsersDetailsHeader from './UsersDetailsHeader';
import { getHistoryAction } from '../../actions/bookAction';

class HistoryPage extends React.Component {
  componentDidMount() {
    this.props.getHistory({ userId: this.props.user.id });
  }
  render() {
    console.log('history page', this.props)
    const { history } = this.props;
    return (
      <div>
        <UsersDetailsHeader
          profileaddress="/user"
          profile="PROFILE"
          historyaddress="/history"
          history="HISTORY"
        />
        <HistoryContainer {...history} />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    history: state.historyReducer.history,
    user: state.userReducer.user
  };
};
export default
connect(mapStateToProps, { getHistory: getHistoryAction })(HistoryPage);
