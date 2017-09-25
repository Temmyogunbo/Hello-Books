import React from 'react';
import PropTypes from 'prop-types';
import swal from 'sweetalert2';
import Button from './ButtonComponent';


class AdminBooks extends React.Component {
  handleCategory() {
    swal({
      title: 'ADD BOOK BY CATEGORY',
      html:
        '<label>CATEGORY</label>' +
        '<input id="category" className="swal2-input">' +
        '<label>TITLE</label>' +
        '<input id="title" className="swal2-input">' +
        '<label>AUTHOR</label>' +
        '<input id="author" className="swal2-input">' +
        '<label>QUANTITY</label>' +
        '<input id="quantity" className="swal2-input">',
      confirmButtonText: 'ADD',
      focusConfirm: false,
      preConfirm: () => {
        return new Promise((resolve) => {
          resolve([
            $('#category').val(),
            $('#title').val(),
            $('#author').val(),
            $('#quantity').val()
          ]);
        });
      }
    }).then((result) => {
      if (result[0] === '' || result[1] === '' || result[2] === '' || result[3] === '') {
        return swal('You entered an invalid input');
      }
      if (isNaN(result[3])) {
        return swal('Quantity must be an integer');
      }
      this.props.addCategory({
        category: result[0],
        title: result[1],
        author: result[2],
        quantity: result[3]
      })
        .then(() => {
          if (this.props.bookMessage.bookAdded) {
            swal(this.props.bookMessage.bookMessage.msg);
            this.props.getAllBooks();
          } else {
            swal(this.props.bookMessage.error.errors[0].msg);
          }
        });
    }).catch(swal.noop);
  }
  handleDelete(book) {
    swal({
      title: 'Delete this book?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(() => {
      this.props.deleteBook(book.id)
        .then(() => {
          if (this.props.deleteMessage.bookDeleted) {
            swal(this.props.deleteMessage.deleteMessage.msg)
            return this.props.getAllBooks();
          }
          swal(this.props.deleteMessage.error.msg);
        })
    }).catch(swal.noop);
  }
  render() {
    let bookItems;
    if (this.props.books) {
      bookItems = this.props.books.map(book => (
        <tr key={book.id}>
          <th><a className="link-color" onClick={() => { this.handleDelete.bind(this)(book)}}>{book.category}</a></th>
          <th>{book.author}</th>
          <th>{book.title}</th>
          <th>{book.quantity}</th>
        </tr>
      ));
    }
    return (
      <div>
        <div className="btn-edit-add">
          <button onClick={this.handleCategory.bind(this)}>ADD BOOK</button>
          <button>EDIT BOOK</button>
        </div>
        <table className="bordered centered admin-books">
          <thead>
            <tr>
              <th>Category</th>
              <th>Author</th>
              <th>Title</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {bookItems}
          </tbody>
        </table>
      </div>
    );
  }
}

AdminBooks.PropTypes = {
  bookItems: PropTypes.object.isRequired,
  map: PropTypes.func.isRequired,
  bookMessage: PropTypes.object.isRequired
};

export default AdminBooks;

