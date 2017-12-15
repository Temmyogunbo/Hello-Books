import React from 'react';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getBookCategoryAction } from '../../../actions/categoryAction';
import { getAllBooksAction } from '../../../actions/bookAction';

const propTypes = {
  category: PropTypes.array.isRequired,
  getBookCategory: PropTypes.func.isRequired,
  getAllBooksByCategory: PropTypes.func.isRequired,
  itemsCountPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired
};
/**This class contains method for bookcategories
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
  /**It invokes an action that gets all books categories
     * @returns {void}
     *
     * @memberof BookCategories
     */
  componentDidMount() {
    this.props.getBookCategory();
  }
  /**It changes the categories state of the
   * component if there is a new props
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

  /**It returns a div elemnent
     *
     *
     * @returns {object} jsx
     * @memberof BookCategories
     */
  render() {
    const {
      itemsCountPerPage,
      currentPage
    } = this.props;
    let categoryItems;
    if (this.state.categories) {
      categoryItems = this.state.categories.map(category => (
        <li key={category.id}>
          <div
            onClick={() => this.props.getAllBooksByCategory({
              bookCategory: category,
              currentPage: 1,
              itemsCountPerPage: itemsCountPerPage
            })}
          >
            {category.category}
          </div>
        </li>
      ));
    }
    return (
      <div className="col s4 l4 m4"
      >
        { isEmpty(categoryItems) ? <div /> :
          <ul className="book-categories col s12 m3 l3">
            <h5>CATEGORY </h5>
            <li>
              <div
                onClick={() => this.props.getAllBooksByCategory({
                  bookCategory: '',
                  currentPage: currentPage,
                  itemsCountPerPage: itemsCountPerPage
                })}
              >
                        All
              </div>
            </li>
            {categoryItems}
          </ul>}</div>
    );
  }
}
/**
 * It slices the state and returns category array
 *
 * @param {object} state
 *
 * @returns {object} new state
*/
const mapStateToProps = (state) => ({
  category: state.bookCategoryReducer
});
BookCategories.propTypes = propTypes;
export default connect(mapStateToProps, {
  getBookCategory: getBookCategoryAction,
  getAllBooksByCategory: getAllBooksAction
})(BookCategories);
