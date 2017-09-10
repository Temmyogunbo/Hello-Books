import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import toastr from 'toastr';
import PropTypes from 'prop-types';

class BookCategories extends React.Component {
  render() {
    return (
      <div className="col s3 m7 container-book-categories">
        <h2 className="header">categories</h2>
        <div className="card horizontal">
              <p className="category">Programming</p>
        </div>
        <div className="card horizontal">
              <p className="category">Mathematics</p>
        </div>
        <div className="card horizontal">
              <p className="category">Romance</p>
        </div>
      </div>
    );
  }
}
export default BookCategories;
