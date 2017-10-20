import React from 'react';
import PropTypes from 'prop-types';

class BookCategories extends React.Component {
  render() {
    console.log('wawu', this.props.categories)
    let categoryItems;
    if (this.props.categories) {
      categoryItems = this.props.categories.map(category => (
        <p key={category.id}><a href="" className="categories-color">{category.category}</a></p>
      ));
    }
    return (
      <div className="book-categories">
        {categoryItems}
      </div>
    );
  }
}
BookCategories.PropTypes = {
  map: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired
};
export default BookCategories;
