import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AdminBooks from '../Admin/AdminBooks';
import BookCategories from '../Books/BookCategories';
import BooksContainer from '../Books/BooksContainer';
import {
  getAllBooksAction,
  borrowBookAction,
  editBookAction,
  addBookAction,
  deleteBookAction,
} from '../../actions/bookAction';
import {
  createBookCategoryAction,
  getBookCategoryAction
} from '../../actions/categoryAction';
import Pagination from '../Pagination';

/**
 *
 * @returns {object} jsx
 * @class CollectionPage
 * @extends {React.Component}
 */
class CollectionPage extends React.Component {
  /**
   * Creates an instance of CollectionPage.
   * @param {any} props
   * @memberof CollectionPage
   */
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: false,
      categories: [],
      books: [],
      activePage: 1,
      itemsCountPerPage: 5
    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }
  /**
   * @returns {void}
   *
   * @memberof CollectionPage
   */
  componentWillMount() {
    if (this.props.user.role === 'admin') {
      this.setState({
        isAdmin: true
      });
    }
  }
  /**
   * @returns {void} jsx
   *
   * @memberof CollectionPage
   */
  componentDidMount() {
    this.props.getAllBooks({
      bookCategory: '',
      currentPage: this.state.activePage,
      itemsCountPerPage: this.state.itemsCountPerPage
    });
  }
  /**
 * @returns {void}
 *
 * @param {any} nextProps
 * @memberof CollectionPage
 */
  componentWillReceiveProps(nextProps) {
    if (nextProps.bookCategory !== this.props.bookCategory) {
      this.setState({ categories: nextProps.bookCategory });
    }
    if (nextProps.books !== this.props.books) {
      this.setState({ books: nextProps.books });
    }
  }
  /**
   * @returns {undefined}
   *
   * @param {any} pageNumber
   * @memberof CollectionPage
   */
  handlePageChange(pageNumber) {
    this.setState({
      activePage: pageNumber,
    }, () => this.props.getAllBooks({
      bookCategory: '',
      currentPage: this.state.activePage,
      itemsCountPerPage: this.state.itemsCountPerPage
    }));
  }
  /**
   *
   *
   * @returns {object} jsx
   * @memberof CollectionPage
   */
  render() {
    const {
      user,
      books,
      borrowBook,
      getAllBooks,
      editBook,
      addBook,
      deleteBook,
      createBookCategory,
      history,
      paginate
    } = this.props;
    return (
      <div className="container mt-2">
        <div className="row">
          <BookCategories
            className="col s3 l3 m3"
            currentPage={this.state.activePage}
            itemsCountPerPage={this.state.itemsCountPerPage}
          />
          {this.state.isAdmin ? <div className="col s9">
            <AdminBooks
              books={this.state.books}
              userId={user.id}
              addBook={addBook}
              editBook={editBook}
              createBookCategory={createBookCategory}
              deleteBook={deleteBook}
              categories={this.state.categories}
              getAllBooks={getAllBooks}
              history={history}
            />
          </div> :
            <div className="col s9 l9 m9">
              <BooksContainer
                books={books}
                user={user}
                borrowBook={borrowBook}
                getAllBooks={getAllBooks}
              />
            </div>}
        </div>
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={this.state.itemsCountPerPage}
          totalItemsCount={paginate}
          pageRangeDisplayed={5}
          handlePageChange={this.handlePageChange}
        />
      </div>
    );
  }
}
CollectionPage.PropTypes = {
  user: PropTypes.object.isRequired,
  books: PropTypes.object.isRequired,
  getAllBooks: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  user: state.userReducer.user,
  isAuthenticated: state.userReducer.isAuthenticated,
  books: state.bookReducer.rows,
  paginate: state.bookReducer.count,
  bookCategory: state.bookCategoryReducer
});


export default
connect(
  mapStateToProps,
  {
    editBook: editBookAction,
    getAllBooks: getAllBooksAction,
    borrowBook: borrowBookAction,
    addBook: addBookAction,
    deleteBook: deleteBookAction,
    getBookCategory: getBookCategoryAction,
    createBookCategory: createBookCategoryAction
  }
)(CollectionPage);

