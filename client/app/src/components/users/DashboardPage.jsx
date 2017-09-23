import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DashboardHead from './DashboardHeader';
import BookCategories from './BookCategories';
import BooksContainer from './BooksContainer';
import { getAllBooksAction, borrowBookAction } from '../../actions/bookAction';

class DashboardPage extends React.Component {
  componentDidMount() {
    document.getElementsByClassName('custom-nav-wrapper')[0]
      .className += ' dashboard-head-color';
    this.props.getAllBooks();
  }
  render() {
    const { user, books, borrowBook, borrowBookReducer, getAllBooks } = this.props;
    return (
      <div className="dashboard-color">
        <DashboardHead
          address="/user"
          name={this.props.user.userName}
          className="dashboard-head-color"
          {...user}
        />
        <BookCategories {...books} />
        <BooksContainer
          {...books}
          user={user}
          borrowBook={borrowBook}
          borrowBookReducer={borrowBookReducer}
          getAllBooks={getAllBooks}
        />
      </div>
    );
  }
}
DashboardPage.PropTypes = {
  name: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  books: PropTypes.object.isRequired,
  getAllBooks: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    books: state.bookReducer.books,
    borrowBookReducer: state.borrowBookReducer
  };
};


export default
connect(mapStateToProps,
  { getAllBooks: getAllBooksAction,
    borrowBook: borrowBookAction
  })(DashboardPage);

