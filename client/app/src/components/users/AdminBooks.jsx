import React from 'react';
import PropTypes from 'prop-types';
import swal from 'sweetalert2';
import BookForm from './BookForm';


class AdminBooks extends React.Component {
  componentDidMount(){
    $(document).ready(function(){
    $('#modal').modal();
  });
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
        });
    }).catch(swal.noop);
  }
  handleEdit(book) {
    swal({
      title: 'EDIT BOOK',
      inputValue: 100,
      html:
        '<label>CATEGORY</label>' +
        `<input id="cat" className="swal2-input" value=${book.category}>` +
        '<label>TITLE</label>' +
        `<input id="tit" className="swal2-input" value=${book.title}>` +
        '<label>AUTHOR</label>' +
        `<input id="auth" className="swal2-input" value=${book.author}>` +
        '<label>QUANTITY</label>' +
        `<input id="quant" className="swal2-input" value=${book.quantity}>`,
      confirmButtonText: 'EDIT',
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
  render() {
    let bookItems;
    if (this.props.books) {
      bookItems = this.props.books.map(book => (
        <tr key={book.id}>
          <th><a className="link-color" onClick={() => { this.handleDelete.bind(this)(book)}}>{book.category}</a></th>
          <th>{book.author}</th>
          <th>{book.title}</th>
          <th>{book.quantity}</th>
          <th><a onClick={() => { this.handleEdit.bind(this)(book)}}>+</a></th>
        </tr>
      ));
    }
    return (
      <div>
        <BookForm />
        <div className="btn-edit-add">
          <div>
            <a className="waves-effect waves-light btn modal-trigger" href="#modal">
              ADD BOOK
            </a>
          </div>
            <button>EDIT BOOK</button>
        </div>
        <div>
        <table className="bordered centered admin-books">
          <thead>
            <tr>
              <th>Category</th>
              <th>Author</th>
              <th>Title</th>
              <th>Quantity</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {bookItems}
          </tbody>
        </table>
        </div>
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

