import React from 'react';
import { connect } from 'react-redux';
import HistoryContainer from './HistoryContainer';
import PropTypes from 'prop-types';
import UsersDetailsHeader from './UsersDetailsHeader';
import {
  getHistoryAction,
  returnBookAction
} from '../../actions/bookAction';

class HistoryPage extends React.Component {
  componentDidMount() {
    this.props.getHistory({ userId: this.props.user.id });
  }
  render() {
    const { userHistory, returnBook, returnBookReducer } = this.props;
    const { id } = this.props.user;
    return (
      <div>
        <UsersDetailsHeader
          profileaddress="/user"
          profile="PROFILE"
          historyaddress="/history"
          historyHead="HISTORY"
        />
        <HistoryContainer {...userHistory} returnBook={returnBook} id={id} returnBookReducer={returnBookReducer} />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userHistory: state.historyReducer.detailedHistory,
    user: state.userReducer.user,
    returnBookReducer: state.returnBookReducer
  };
};
export default
connect(mapStateToProps, {
  getHistory: getHistoryAction,
  returnBook: returnBookAction })(HistoryPage);
