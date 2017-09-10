import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import Books from './Books';

class BooksCompartment extends React.Component {
  render() {
    return (
      <div className="books-compartment">
        <Books
          title="Elementary algebra"
          author="WhiteHead" description="Maths is fun"
        />
        <Books
          title="Learn to program"
          author="Don Ducket" description="A step by step guide to programming"
        />
        <Books
          title="Romeo and Juliet"
          author="Shakespare" description="A beautiful story of love"
        />
      </div>
    )
  }
}
export default BooksCompartment;
