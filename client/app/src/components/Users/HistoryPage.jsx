import React from 'react';
import { connect } from 'react-redux';
import swal from "sweetalert2";
import PropTypes from 'prop-types';
import Profile from './Profile';
import UserRecords from './UserRecords';
import {
  returnBookAction
} from '../../actions/bookAction';
import {
  getHistoryAction,
} from '../../actions/userActions';

const propTypes = {
  getHistory: PropTypes.func.isRequired
};
/**
 *
 * @returns {object} jsx
 * @class BookPage
 * @extends {React.Component}
 */
class HistoryPage extends React.Component {
  /**
   * Creates an instance of HistoryPage.
   * @param {any} props
   * @memberof HistoryPage
   */
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: false
    };
  }
  /**
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
  /**
   * @returns {void}
   *
   * @memberof HistoryPage
   */
  componentDidMount() {
    this.props.getHistory({ userId: this.props.user.id });
  }
  /**
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
  /**
   *
   *
   * @returns {object} jsx
   * @memberof HistoryPage
   */
  render() {
    const {
      userHistoryReducer,
      returnBook,
      history,
      getHistory,
      user
    } = this.props;
    return (
      <div>
        <div className="container">
          <div className="row">
            <Profile user={user}/>
          </div>
          {this.state.isAdmin ? '' :
            <UserRecords
              userHistory={userHistoryReducer}
              returnBook={returnBook}
              getHistory={getHistory}
              userId={this.props.user.id}
              handleReturnBook={this.handleReturnBook}
            />}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.userReducer.user,
  userHistoryReducer: state.userHistoryReducer
});
HistoryPage.propTypes = propTypes;
export default
connect(mapStateToProps, {
  getHistory: getHistoryAction,
  returnBook: returnBookAction
})(HistoryPage);
