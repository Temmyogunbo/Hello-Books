import React from 'react';
import PropTypes from 'prop-types';
import swal from 'sweetalert2';
// import Button from './ButtonComponent';
import image from '../../images/mathcover.jpg';

class Books extends React.Component {
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
              if (this.props.borrowBookReducer.BookIsBorrowed) {
                swal(
                  this.props.borrowBookReducer.message.message
                ).catch(swal.noop);
                this.props.getAllBooks();
              } else {
                swal(
                  this.props.borrowBookReducer.error.message
                ).catch(swal.noop);
                this.props.getAllBooks();
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

          <div><button onClick={this.dialogueBox.bind(this)}>Borrow Book</button></div>
        </div>
      </div>
    );
  }
}

Books.PropTypes = {
  title: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  dialogueBox: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  borrowBookReducer: PropTypes.object.isRequired
};
export default Books;
