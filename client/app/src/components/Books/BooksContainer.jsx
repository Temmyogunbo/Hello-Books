import React from 'react';
import isEmpty from 'lodash';
import { Link } from 'react-router-dom';


const BooksContainer = (props) => {
  let bookItems;
  if (props.books) {
    bookItems = props.books.map(book => (
      <div className="col s4 l3" key={book.id}>
        <Link to={`/collections/books/${book.id}`}>
          <div key={book.id}>
            <div className="book-size card">
              <div className="card-image">
                <img
                  role="book cover"
                  src={book.imageUrl}
                  style={{ width: '100%', height: '150px' }}/>
              </div>
              <div className="card-content card-color">
                {book.title}
              </div>
            </div>
          </div>
        </Link>
      </div>
    ));
  }
  return (
    <div className="row">
      {isEmpty(bookItems) ?
        bookItems : <h3>There are now no books in the library.</h3>}
    </div>
  );
};
export default BooksContainer;
