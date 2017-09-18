import React from 'react';
import PropTypes from 'prop-types';
import CategoriesComponent from './CategoriesComponent';

class BookCategories extends React.Component {
  render() {
    let bookItems;
    if (this.props.books) {
      bookItems = this.props.books.map(book => (
        <CategoriesComponent key={book.id} {...book} />
      ));
    }
    return (
      <div className="books-categories">
        {bookItems}
      </div>
    );
  }
}
BookCategories.PropTypes = {
  map: PropTypes.func.isRequired
};
export default BookCategories;
