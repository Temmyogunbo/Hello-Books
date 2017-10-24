import React from 'react';
import PropTypes from 'prop-types';
import swal from 'sweetalert2';
import BookForm from './BookForm';


class AdminBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      book: {},
      books: []
    }
    this.onClickEditBook = this.onClickEditBook.bind(this);
  }
  componentDidMount() {
    $(document).ready(function () {
      $('#book-form-modal').modal({
        dismissible: false
      });
      $('#book-form-modal').modal({
        dismissible: false
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.books !== this.props.books) {
      this.setState({ books: nextProps.books })
    }
  }
  onClickEditBook(event) {
    event.preventDefault();
    const bookId = event.target.parentNode.id;
    const book = this.props.books.find(book => parseInt(book.id, 10) === parseInt(bookId, 10));
    this.setState({
      book: book
    });
  }

  handleDelete(book) {
    swal({
      title: 'Delete this book?',
      text: "You won't be able to revert this!",
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

  render() {
    let bookItems;
    if (this.state.books) {
      bookItems = this.state.books.map((book, index) => (
        <tr key={book.id}>
          <th>{index + 1}</th>
          <th>{book.category}</th>
          <th>{book.author}</th>
          <th>{book.title}</th>
          <th>{book.quantity}</th>
          <th id={book.id}>
            <a
              className="waves-effect waves-light modal-trigger"
              href="#book-form-modal"
            >
              +
          </a>
          </th>
          <th>
            <a className="link-color" onClick={() => { this.handleDelete.bind(this)(book) }}>
              <i className="fa fa-trash-o" aria-hidden="true"></i>
            </a>
          </th>
        </tr>
      ));
    }
    return (
      <div>
        <BookForm
          book={this.state.book}
          categories={this.props.categories}
          addBook={this.props.addBook} />
        <div className="btn-edit-add">
          <div>
            <a
              className="waves-effect waves-light btn modal-trigger"
              href="#book-form-modal"
            >
              ADD BOOK
            </a>
          </div>
        </div>
        <div>
          <table className="bordered centered admin-books">
            <thead>
              <tr>
                <th>S/N</th>
                <th>Category</th>
                <th>Author</th>
                <th>Title</th>
                <th>Quantity</th>
                <th></th>
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
  map: PropTypes.func.isRequired
};

export default AdminBooks;

