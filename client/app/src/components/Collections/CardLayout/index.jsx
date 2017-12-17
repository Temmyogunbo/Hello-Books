import React from 'react';
import isEmpty from 'lodash';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const propTypes = {
  books: PropTypes.array.isRequired,
  role: PropTypes.string.isRequired,
  handleDeleteBook: PropTypes.func.isRequired,
  handleEditBook: PropTypes.func.isRequired
};
/**It returns a div element
*
*
* @param {any} props
* @returns {object} jsx
*/
function CardList({
  books,
  role,
  handleDeleteBook,
  handleEditBook
}) {
  return (
    <div className="col s12 l8 m8">
      {
        isEmpty(books) ?
          <ul >

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
                    <div
                      className="card-color"
                    >
                      {book.title}
                    </div>
                  </div>
                </Link>
                {role === 'admin' ? <div>
                  <i
                    id={book.id}
                    className="fa fa-trash-o mr-1"
                    aria-hidden="true"
                    onClick={handleDeleteBook}

                  />
                  <i
                    id={book.id}
                    className="material-icons mr-1"
                    onClick={handleEditBook}
                  >edit
                  </i>
                  <span>Qty: {book.quantity}</span>
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

