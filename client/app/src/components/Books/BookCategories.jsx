import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getBookCategoryAction
} from '../../actions/categoryAction';

const propTypes = {
  category: PropTypes.array.isRequired,
  getBookCategory: PropTypes.func.isRequired,
};
/**
 * 
 * @returns {object} jsx
 * @class BookPage
 * @extends {React.Component}
 */
class BookCategories extends React.Component {
  /**
   * Creates an instance of BookCategories.
   * @param {any} props 
   * @memberof BookCategories
   */
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    };
  }
  /**
   * @returns {void}
   * 
   * @memberof BookCategories
   */
  componentDidMount() {
    this.props.getBookCategory();
  }
  /**
   * @returns {void}
   * 
   * @param {any} nextProps 
   * @memberof BookCategories
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.category !== this.props.category) {
      this.setState({ categories: nextProps.category });
    }
  }
  /**
   * 
   * 
   * @returns {object} jsx
   * @memberof BookCategories
   */
  render() {
    let categoryItems;
    if (this.state.categories) {
      categoryItems = this.state.categories.map(category => (
        <li key={category.id}>
          <Link to="#" className="categories-color">
            {category.category}
          </Link>
        </li>
      ));
    }
    return (
      <ul className="book-categories col s3">
        <h5>CATEGORY </h5>
        {categoryItems}
      </ul>

    );
  }
}
const mapStateToProps = (state) => ({
  category: state.bookCategoryReducer
});
BookCategories.propTypes = propTypes;
export default connect(mapStateToProps, {
  getBookCategory: getBookCategoryAction
})(BookCategories);
