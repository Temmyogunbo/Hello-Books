import React from 'react';
import PropTypes from 'prop-types';
import swal from 'sweetalert2';
import { connect } from 'react-redux';
import {
  getAllBooksAction,
  borrowBookAction
} from '../../../actions/bookAction';
import Button from '../../Button';

const propTypes = {
  books: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  getBook: PropTypes.func.isRequired,
  borrowBook: PropTypes.func.isRequired,
  role: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired
};

/**
 *
 * @returns {object} jsx
 * @class BookPage
 * @extends {React.Component}
 */
class BookPage extends React.Component {
  /**
     * Creates an instance of BookPage.
     * @param {any} props
     * @memberof BookPage
     */
  constructor(props) {
    super(props);
    this.state = {
      book: {}
    };
    this.handleBorrowBook = this.handleBorrowBook.bind(this);
  }
  /**
     *
     * @returns {void}
     * @memberof BookPage
     */
  componentDidMount() {
    this.props.getBook({ bookId: this.props.match.params.bookId });
  }
  /**
     * @returns {void} description -
     *
     * @param {any} nextProps
     * @memberof BookPage
     */
  componentWillReceiveProps(nextProps) {
    if (nextProps.books !== this.props.books) {
      this.setState({ book: nextProps.books });
    }
  }
  /**
     *
     * @returns{void}
     * @memberof BookPage
     */
  handleBorrowBook() {
    swal({
      title: 'Do you want to borrow this book?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    })
      .then(() => {
        this.props.borrowBook({
          bookId: this.state.book.id,
          userId: this.props.user.id,
          membership: this.props.user.membership
        });
        this.props.history.goBack();
      })
      .catch(swal.noop);
  }
  /**
     *
     *
     * @returns {object} jsx
     * @memberof BookPage
     */
  render() {
    return (
      <div className="container mt-2">
        <div className="row hide-on-small-only">
          <div className="col s6">
            <div>
              <img
                className="responsive-img"
                src={this.state.book.imageUrl}
                style={{ height: "300px", width: "300px" }}
              />
            </div>
            {this.props.role === 'admin' ? null :
              <Button
                type={'submit'}
                className={"bc waves-effect waves-light btn brown darken-4"}
                onClick={this.handleBorrowBook}
                children={'Borrow Book'}
              />}

          </div>
          <div className="col s6">
            <div className="fs-2">
              {this.state.book.title}
              <div>
                    by {this.state.book.author}
              </div>
            </div>
            <div className="mt-2">
              {this.state.book.description}
            </div>
          </div>
        </div>
        <div className="hide-on-med-and-up mt-2">
          <div className="row">
            <div className="col s6">
              <div>
                <img
                  className="responsive-img"
                  src={this.state.book.imageUrl}
                  style={{ height: "300px", width: "300px" }}
                />
              </div>
              {this.props.role === 'admin' ? null :
                <Button
                  type={'submit'}
                  className={"bc waves-effect waves-light btn brown darken-4"}
                  onClick={this.handleBorrowBook}
                  children={'Borrow Book'}
                /> }

            </div>
            <div className="col s6">
              <div className="fs-2">
                {this.state.book.title}
                <div>
                    by {this.state.book.author}
                </div>
              </div>
              <div className="mt-2">
                {this.state.book.description}
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state, props) => ({
  user: state.userReducer.user,
  role: state.userReducer.user.role,
  books: state.bookReducer.rows.find(book => parseInt(book.id, 10) ===
        parseInt(props.match.params.bookId, 10))
});
BookPage.propTypes = propTypes;
export default connect(mapStateToProps, {
  getBook: getAllBooksAction,
  borrowBook: borrowBookAction
})(BookPage);
