import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import DashboardHead from './DashboardHeader';
import BookCategories from './BookCategories';
import BooksCompartment from './BooksCompartment';
import AdminBooks from './AdminBooks';

class AdminDashboardPage extends React.Component {
  componentDidMount() {
    document.getElementsByClassName('custom-nav-wrapper')[0].className += ' dashboard-head-color';
  }
  render() {
    return (
      <div className="dashboard-color">
        <DashboardHead help="Help" name="username" signOut="Sign out"
        className="dashboard-head-color" />
        <BookCategories />
        <AdminBooks />
      </div>
    )
  }
}

export default AdminDashboardPage;
