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
  deleteBookAction,
  getCategoryAction
} from '../../actions/bookAction';

class AdminDashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    }
  }
  componentWillMount() {
    if (this.props.user.role !== 'admin') {
      this.props.history.push('/');
    }
  }
  componentDidMount() {
    document.getElementsByClassName('custom-nav-wrapper')[0].className += ' dashboard-head-color';
    this.props.getAllBooks();
    this.props.getCategory();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.category !== this.props.category) {
      this.setState({ categories: nextProps.category })
    }
  }
  render() {
    const { addCategory, getAllBooks, bookMessage, deleteMessage, deleteBook } = this.props;
    return (
      <div className="dashboard-color">
        <DashboardHead
          name={this.props.user.userName}
          className="dashboard-head-color" {...this.props} />
        <div>
          <BookCategories categories={this.state.categories} />
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
  history: PropTypes.object.isRequired,
  category: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    books: state.bookReducer.books,
    bookMessage: state.addBookReducer,
    deleteMessage: state.deleteBookReducer,
    category: state.categoryReducer.category
  };
};
export default
  connect(mapStateToProps,
    {
      getAllBooks: getAllBooksAction,
      addCategory: addBookAction,
      deleteBook: deleteBookAction,
      getCategory: getCategoryAction
    })(withRouter(AdminDashboardPage));
