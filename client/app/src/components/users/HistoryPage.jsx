import React from 'react';
import { connect } from 'react-redux';
import swal from "sweetalert2";
import PropTypes from 'prop-types';

import Profile from './Profile';
import UserRecords from './UserRecords';
import PasswordForm from '../forms/PasswordForm';
import Pagination from '../Pagination';
import {
  returnBookAction
} from '../../actions/bookAction';
import {
  getHistoryAction,
  changePasswordAction
} from '../../actions/userActions';

const propTypes = {
  getHistory: PropTypes.func.isRequired,
  changePassword: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  total: PropTypes.number.isRequired,
  userHistoryReducer: PropTypes.array.isRequired,
  returnBook: PropTypes.func.isRequired
};

/**It contains state and behaviours for HistoryPage componenent
 *
 * @returns {object} jsx
 *
 * @class HistoryPage
 *
 * @extends {React.Component}
 */
export class HistoryPage extends React.Component {
  /**
   * Creates an instance of HistoryPage.
   *
   * @param {any} props
   *
   * @memberof HistoryPage
   */
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: false,
      activePage: 1,
      itemsCountPerPage: 5
    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }
  /**It checks if a user role is admin
   *
   * @returns {void}
   *
   * @memberof HistoryPage
   */
  componentWillMount() {
    if (this.props.user.role === 'admin') {
      this.setState({
        isAdmin: true
      });
    }
  }
  /**It calls action to fetch user history and initializes modal component
   *
   * @returns {void}
   *
   * @memberof HistoryPage
   */
  componentDidMount() {
    const { $ } = window;
    this.props.getHistory({
      userId: this.props.user.id,
      currentPage: this.state.activePage,
      itemsCountPerPage: this.state.itemsCountPerPage
    });
    $(document).ready(() => {
      $('#change-password').modal({
        dismissible: false
      });
    });
  }
  /**It handles page on change and calls action to fetch history
   *
   * @returns {undefined}
   *
   * @param {any} pageNumber
   *
   * @memberof HistoryPage
   */
  handlePageChange(pageNumber) {
    this.setState({
      activePage: pageNumber,
    }, () => this.props.getHistory({
      userId: this.props.user.id,
      currentPage: this.state.activePage,
      itemsCountPerPage: this.state.itemsCountPerPage
    }));
  }
  /**It handles return book
   *
   *
   * @param {any} data
   * @returns {void}
   * @memberof HistoryPage
   */
  handleReturnBook(data) {
    const { historyObj, id, CB } = data;
    if (!historyObj.returned) {
      return swal('You want to return this book')
        .then(() => {
          CB({
            historyObj,
            BookId: historyObj.BookId,
            userId: id
          });
        }).catch(swal.noop);
    }
    swal('This book has been returned')
      .catch(swal.noop);
  }
  /**It returns a div element
   *
   * @returns {object} jsx
   *
   * @memberof HistoryPage
   */
  render() {
    const {
      userHistoryReducer,
      total,
      returnBook,
      getHistory,
      changePassword,
      user
    } = this.props;
    return (
      <div className="container">
        <PasswordForm
          changePassword={changePassword}
          userName={user.userName}
        />
        <Profile user={user}/>
        <br />
        <UserRecords
          userHistory={userHistoryReducer}
          returnBook={returnBook}
          getHistory={getHistory}
          userId={this.props.user.id}
          handleReturnBook={this.handleReturnBook}
          activePage={this.state.activePage}
          itemsCountPerPage={this.state.itemsCountPerPage}
        />
        {total ?
          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={this.state.itemsCountPerPage}
            totalItemsCount={total}
            pageRangeDisplayed={5}
            handlePageChange={this.handlePageChange}
          /> : null}

      </div>
    );
  }
}
/**
 * It slices the state and returns user, userHistoryReducer, total
 *
 * @param {object} state
 *
 * @returns {object} new state
*/
const mapStateToProps = (state) => ({
  user: state.userReducer.user,
  userHistoryReducer: state.userHistoryReducer.rows,
  total: state.userHistoryReducer.count
});
HistoryPage.propTypes = propTypes;
export default
connect(mapStateToProps, {
  getHistory: getHistoryAction,
  returnBook: returnBookAction,
  changePassword: changePasswordAction
})(HistoryPage);
