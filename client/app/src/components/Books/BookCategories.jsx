import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getBookCategoryAction } from '../../actions/categoryAction';
import { getAllBooksByCategoryAction } from '../../actions/bookAction';

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
    this.handleCategory = this.handleCategory.bind(this);
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
   * @returns {void}
   *@param {any} category
   * @memberof BookCategories
   */
  handleCategory(category) {
    console.log('category', category);
    this.props.getAllBooksByCategory(category);
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
          <div onClick={() => this.handleCategory(category)}>
            {category.category}
          </div>
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
  getBookCategory: getBookCategoryAction,
  getAllBooksByCategory: getAllBooksByCategoryAction
})(BookCategories);
