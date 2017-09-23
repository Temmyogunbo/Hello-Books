import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import DashboardHead from './DashboardHeader';
import BookCategories from './BookCategories';
import AdminBooks from './AdminBooks';
import { getAllBooksAction, addBookAction } from '../../actions/bookAction';

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
    const { addCategory, getAllBooks, bookMessage } = this.props;
    return (
      <div className="dashboard-color">
        <DashboardHead
          name={this.props.user.userName}
          className="dashboard-head-color" {...this.props} />
        <BookCategories {...this.props.books} />
        <AdminBooks
          {...this.props.books}
          addCategory={addCategory}
          getAllBooks={getAllBooks}
          bookMessage={bookMessage}
        />
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
    bookMessage: state.addBookReducer
  };
};
export default
connect(mapStateToProps,
  {
    getAllBooks: getAllBooksAction,
    addCategory: addBookAction
  })(withRouter(AdminDashboardPage));
