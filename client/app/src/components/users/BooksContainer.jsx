import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import swal from 'sweetalert2';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import Books from './Books';
import borrowBookAction from '../../actions/bookAction';

class BooksCompartment extends React.Component {
  render() {
    let bookItems;
    if (this.props.books) {
      bookItems = this.props.books.map(book => (
        <Books key={book.id} {...book} />
      ));
    }
    return (
      <div className="books-compartment">
        {bookItems}
      </div>
    );
  }
}
export default connect(null, { borrowBookAction })(BooksCompartment);
