import React from 'react';
import isEmpty from 'lodash';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const propTypes = {
  books: PropTypes.array.isRequired,
  handleDeleteBook: PropTypes.func.isRequired,
  handleEditBook: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};
/**It returns a div element
*
*
* @param {object} props

* @returns {object} jsx
*/
function CardList({
  books,
  handleDeleteBook,
  handleEditBook,
  isAdmin,
}) {
  return (
    <div className="col s12 l9 m8">
      {
        isEmpty(books) ?
          <ul className="book-list">

            {books && books.map(book => (<li
              key={book.id}
              className="col s12 l4 m4"
            >
              <div className="card">
                <Link to={`/collections/books/${book.id}`}>
                  <div className="book-size">

                    <div className="card-image">
                      <img
                        className="responsive-img"
                        role="book cover"
                        src={book.imageUrl}
                        style={{ width: '100%', height: '150px' }} />
                    </div>
                    <br />
                    <br />
                    <div
                      className="card-color"
                      style={{ margin: "0 10px 0 10px" }}
                    >
                      {book.title}
                    </div>
                  </div>
                </Link>
                {isAdmin ? <div className="row">
                  <i
                    id={book.id}
                    className="material-icons clickable col s3 m3 l3"
                    onClick={handleEditBook}
                  >edit
                  </i>
                  <span className="col s6 m6 l6">Qty: {book.quantity}</span>
                  <i
                    id={book.id}
                    className="fa fa-trash-o  clickable col s3 m3 l3"
                    aria-hidden="true"
                    style={{ fontSize: "26px" }}
                    onClick={handleDeleteBook}

                  />
                </div> : null}
              </div>
            </li>))}
          </ul> :
          <h3>There are now no books in the library.</h3>}
    </div>
  );
}
CardList.propTypes = propTypes;

export default CardList;

