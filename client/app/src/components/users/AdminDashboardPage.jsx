import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import DashboardHead from './DashboardHeader';
import BookCategories from './BookCategories';
import AdminBooks from './AdminBooks';
import { getAllBooksAction } from '../../actions/bookAction';

class AdminDashboardPage extends React.Component {
  componentDidMount() {
    document.getElementsByClassName('custom-nav-wrapper')[0].className += ' dashboard-head-color';
    this.props.getAllBooks();
  }
  render() {
    const { user, books } = this.props;
    return (
      <div className="dashboard-color">
        <DashboardHead
          name={this.props.user.userName}
          className="dashboard-head-color" {...this.props} />
        <BookCategories {...this.props.books} />
        <AdminBooks {...this.props.books} />
      </div>
    );
  }
}
AdminDashboardPage.PropTypes = {
  name: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    books: state.bookReducer.books
  };
};

const mapDispatchToProps = dispatch => ({
  getAllBooks: () => dispatch(
    getAllBooksAction()
  )
});
export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboardPage);
