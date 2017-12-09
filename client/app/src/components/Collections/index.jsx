import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TableLayout from './TableLayout';
import BookCategories from './BookCategories';
import CardLayout from './CardLayout';
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
import { getNotificationsAction } from '../../actions/notificationsAction';
import Pagination from '../Pagination';


const propTypes = {
  user: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  books: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  bookCategory: PropTypes.array.isRequired,
  editBook: PropTypes.func.isRequired,
  getAllBooks: PropTypes.func.isRequired,
  borrowBook: PropTypes.func.isRequired,
  addBook: PropTypes.func.isRequired,
  deleteBook: PropTypes.func.isRequired,
  getBookCategory: PropTypes.func.isRequired,
  createBookCategory: PropTypes.func.isRequired,
  getNotifications: PropTypes.func.isRequired
};
const defaultProps = {
  total: 0,
  books: []
};
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
     * @returns {void} jsx
     *
     * @memberof CollectionPage
     */
  componentDidMount() {
    if (this.props.user.role === 'admin') {
      this.setState({
        isAdmin: true
      });
    }
    this.props.getAllBooks({
      bookCategory: '',
      currentPage: this.state.activePage,
      itemsCountPerPage: this.state.itemsCountPerPage
    });
    this.props.getNotifications({
      currentPage: 1,
      itemsCountPerPage: 5
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
      total
    } = this.props;
    return (
      <div className="container mt-2">
        <div className="row">
          <BookCategories
            currentPage={this.state.activePage}
            itemsCountPerPage={this.state.itemsCountPerPage}
          />
          {this.state.isAdmin ?
            <TableLayout
              books={this.state.books}
              userId={user.id}
              addBook={addBook}
              editBook={editBook}
              createBookCategory={createBookCategory}
              deleteBook={deleteBook}
              categories={this.state.categories}
              getAllBooks={getAllBooks}
              history={history}
            /> :
            <CardLayout
              books={books}
              user={user}
              borrowBook={borrowBook}
              getAllBooks={getAllBooks}
            />}
        </div>
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={this.state.itemsCountPerPage}
          totalItemsCount={total}
          pageRangeDisplayed={5}
          handlePageChange={this.handlePageChange}
        />
      </div>
    );
  }
}
CollectionPage.propTypes = propTypes;
CollectionPage.defaultProps = defaultProps;


const mapStateToProps = (state) => ({
  user: state.userReducer.user,
  isAuthenticated: state.userReducer.isAuthenticated,
  books: state.bookReducer.rows,
  total: state.bookReducer.count,
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
    createBookCategory: createBookCategoryAction,
    getNotifications: getNotificationsAction
  }
)(CollectionPage);

