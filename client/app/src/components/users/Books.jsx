import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import toastr from 'toastr';
import PropTypes from 'prop-types';

class Books extends React.Component {
  render() {
    return (
      <div className="card book-size">
        <div className="card-image waves-effect waves-block waves-light">
          <img
            className="activator"
            src="../../sass/img/mathcover.jpg" alt=""
          />
        </div>
        <div className="card-content">
          <span className="card-title activator grey-text text-darken-4">
            {this.props.title}
          </span>
        </div>
        <div className="card-reveal">
          <span className="card-title grey-text text-darken-4">
            {this.props.author}
          </span>
          <p className="description">{this.props.description}</p>
          <div><Link to=""><button>Borrow Book</button></Link></div>
        </div>
      </div>
    );
  }
}
Books.PropTypes = {
  title: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  description: PropTypes.object.isRequired
};
export default Books;
