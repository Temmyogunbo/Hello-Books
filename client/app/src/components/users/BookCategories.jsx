import React from 'react';
import PropTypes from 'prop-types';

class BookCategories extends React.Component {
  render() {
    let bookItems;
    if (this.props.books) {
      bookItems = this.props.books.map(book => (
        <p key={book.id}><a href="" className="categories-color">{book.category}</a></p>
      ));
    }
    return (
      <div className="book-categories">
        {bookItems}
      </div>
    );
  }
}
BookCategories.PropTypes = {
  map: PropTypes.func.isRequired,
  books: PropTypes.object.isRequired
};
export default BookCategories;
