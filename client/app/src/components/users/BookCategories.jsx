import React from 'react';
import PropTypes from 'prop-types';

class BookCategories extends React.Component {
  render() {
    let bookItems;
    if (this.props.books) {
      bookItems = this.props.books.map(book => (
        <p key={book.id}><a href="">{book.category}</a></p>
      ));
    }
    return (
      <div className="books-categories categories-component">
        {bookItems}
      </div>
    );
  }
}
BookCategories.PropTypes = {
  map: PropTypes.func.isRequired
};
export default BookCategories;
