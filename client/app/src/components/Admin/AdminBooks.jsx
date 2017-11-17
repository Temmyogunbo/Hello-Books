import React from 'react';
import PropTypes from 'prop-types';
import swal from 'sweetalert2';
import $ from 'jquery';
import cloudinary from 'cloudinary';
import BookForm from '../Modals/BookForm';
import CategoryForm from '../Modals/CategoryForm';

cloudinary.config({
  cloud_name: process.env.APP_CLOUD_NAME,
  api_key: process.env.APP_API_KEY,
  api_secret: process.env.APP_API_SECRET
});

const propTypes = {
  books: PropTypes.array.isRequired
};
/**
 * 
 * @returns {object} jsx
 * @class BookPage
 * @extends {React.Component}
 */
class AdminBooks extends React.Component {
  /**
   * Creates an instance of AdminBooks.
   * @param {any} props 
   * @memberof AdminBooks
   */
  constructor(props) {
    super(props);
    this.state = {
      book: {},
      books: []
    };
    this.onClickEditBook = this.onClickEditBook.bind(this);
  }
  /**
   * @returns {void}
   * 
   * @memberof AdminBooks
   */
  componentDidMount() {
    this.var = '';
    $(document).ready(() => {
      $('#book-form-modal').modal({
        dismissible: false
      });
    });
    $('#book-category-form-modal').modal({
      dismissible: false
    });
  }
  /**
   * @returns {void}
   * 
   * @param {any} nextProps 
   * @memberof AdminBooks
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.books !== this.props.books) {
      this.setState({ books: nextProps.books });
    }
  }
  /**
   * @returns {void}
   * 
   * @param {any} event 
   * @memberof AdminBooks
   */
  onClickEditBook(event) {
    event.preventDefault();
    const bookId = event.target.parentNode.id;
    const book = this.props.books
      .find(book => parseInt(book.id, 10) === parseInt(bookId, 10));
    this.setState({
      book: book
    });
    return $('#book-form-modal').modal('open');
  }
  /**
   * @returns {void}
   * 
   * @param {any} book 
   * @memberof AdminBooks
   */
  handleDelete(book) {
    swal({
      title: `Delete ${book.author} book?`,
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(() => {
      this.props.deleteBook(book);
      cloudinary.uploader.destroy(book.imagePublicId, (result) => { console.log(result); });
    }).catch(swal.noop);
  }
  /**
 *
 * @return {void} the add book action is dispatched
 * @param {void} event - on click event
 * @memberof add Book form
 */
  handleSubmit(event) {
    event.preventDefault();
    if (this.validateForm()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.addbook(this.state);
    }
  }
  /**
   * 
   * 
   * @returns {object} jsx
   * @memberof AdminBooks
   */
  render() {
    const {
      userId,
      categories,
      createBookCategory,
      editBook,
      addBook,
      history
    } = this.props;
    let bookItems;
    if (this.state.books) {
      bookItems = this.state.books.map((book, index) => (
        <tr key={book.id}>
          <td>{index + 1}</td>
          <td>{book.category}</td>
          <td>{book.author}</td>
          <td>{book.title}</td>
          <td>{book.quantity}</td>
          <td>{book.description}</td>
          <td id={book.id}>
            <i
              className="material-icons"
              onClick={this.onClickEditBook}>edit</i>

          </td>
          <td>
            <i className="fa fa-trash-o" aria-hidden="true" onClick={() => { this.handleDelete.bind(this)(book); }} />
          </td>
        </tr>
      ));
    }
    return (
      <div>
        <BookForm
          book={this.state.book}
          userId={userId}
          categories={categories}
          editBook={editBook}
          addBook={addBook}
          history={history}
        />
        <CategoryForm
          createBookCategory={createBookCategory}
        />
        <div className="btn-edit-add">
          <a
            className="bc mr-2 waves-effect waves-light btn modal-trigger brown darken-4"
            href="#book-category-form-modal"
          >
              CREATE A CATEGORY
          </a>
          <a
            className="waves-effect waves-light btn modal-trigger brown darken-4"
            href="#book-form-modal"
          >
              ADD BOOK
          </a>
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
                <th>Description</th>
                <th />
                <th />
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
AdminBooks.propTypes = propTypes;
export default AdminBooks;

