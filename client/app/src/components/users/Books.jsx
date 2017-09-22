import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import swal from 'sweetalert2';
import { borrowBookAction } from '../../actions/bookAction';
// import Button from './ButtonComponent';
import image from '../../images/mathcover.jpg';

class Books extends React.Component {
  constructor(props) {
    super(props);
    this.dialogueBox = this.dialogueBox.bind(this);
  }
  dialogueBox() {
    swal({
      title: 'Will you borrow this book?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    })
      .then((yes) => {
        if (yes) {
          this.props.borrowBook({
            bookId: this.props.id,
            userId: this.props.user.id,
            membership: this.props.user.membership
          })
            .then(() => {
              if (this.props) {
                swal(
                  this.props.borrowBookReducer.error.message
                ).catch(swal.noop);
              }
            });
        }
      })
      .catch(swal.noop);
  }
  render() {
    return (
      <div className="card book-size">
        <div className="card-image waves-effect waves-block waves-light">
          <img
            className="activator"
            src={image} alt="book-cover"
          />
        </div>
        <div className="card-content custom-card-content">
          <span className="card-title activator grey-text text-darken-4 text-size">
            {this.props.title}
          </span>
        </div>
        <div className="card-reveal">
          <span className="card-title grey-text text-darken-4 text-size">
            {this.props.author}
          </span>

          <div><button onClick={this.dialogueBox}>Borrow Book</button></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    borrowBookReducer: state.borrowBookReducer
  };
};

Books.PropTypes = {
  title: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  dialogueBox: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};
export default
connect(mapStateToProps, { borrowBook: borrowBookAction })(Books);
