import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DashboardHead from './DashboardHeader';
import BookCategories from './BookCategories';
import AdminBooks from './AdminBooks';
import {
  getAllBooksAction,
  addBookAction,
  deleteBookAction
} from '../../actions/bookAction';

class AdminDashboardPage extends React.Component {
  componentWillMount() {
    if (this.props.user.roleId !== 1) {
      this.props.history.push('/');
    }
  }
  componentDidMount() {
    document.getElementsByClassName('custom-nav-wrapper')[0].className += ' dashboard-head-color';
    this.props.getAllBooks();
  }
  render() {
    const { addCategory, getAllBooks, bookMessage, deleteMessage, deleteBook } = this.props;
    return (
      <div className="dashboard-color">
        <DashboardHead
          name={this.props.user.userName}
          className="dashboard-head-color" {...this.props} />
        <div>
          <BookCategories
            {...this.props.books}
          />
          <AdminBooks
            className="admin-books"
            {...this.props.books}
            addCategory={addCategory}
            getAllBooks={getAllBooks}
            bookMessage={bookMessage}
            deleteMessage={deleteMessage}
            deleteBook={deleteBook}
          />
        </div>
      </div>
    );
  }
}
AdminDashboardPage.PropTypes = {
  name: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    books: state.bookReducer.books,
    bookMessage: state.addBookReducer,
    deleteMessage: state.deleteBookReducer
  };
};
export default
connect(mapStateToProps,
  {
    getAllBooks: getAllBooksAction,
    addCategory: addBookAction,
    deleteBook: deleteBookAction
  })(withRouter(AdminDashboardPage));
