import React from 'react';
import PropTypes from 'prop-types';
import Books from './Books';

class BooksCompartment extends React.Component {
  render() {
    const { user, borrowBookReducer, borrowBook, getAllBooks } = this.props;
    let bookItems;
    if (this.props.books) {
      bookItems = this.props.books.map(book => (
        <Books
          key={book.id}
          {...book}
          user={user}
          borrowBook={borrowBook}
          borrowBookReducer={borrowBookReducer}
          getAllBooks={getAllBooks}
        />
      ));
    }
    return (
      <div className="books-compartment">
        {bookItems}
      </div>
    );
  }
}
export default BooksCompartment;
