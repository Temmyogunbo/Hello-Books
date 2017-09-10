import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import DashboardHead from './DashboardHeader';
import BookCategories from './BookCategories';
import BooksCompartment from './BooksCompartment';

class DashboardPage extends React.Component {
  render() {
    return (
      <div>
        <DashboardHead help="Help" name="username" signOut="Sign out" />
        <BookCategories />
        <BooksCompartment />
      </div>
    );
  }
}
export default DashboardPage;

