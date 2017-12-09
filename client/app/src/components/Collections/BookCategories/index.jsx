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
              currentPage: currentPage,
              itemsCountPerPage: itemsCountPerPage
            })}
          >
            {category.category}
          </div>
        </li>
      ));
    }
    return (
      <div className="col s3 l3 m3"
      >
        { isEmpty(categoryItems) ? <div /> : <ul className="book-categories col s3 m3 l3">
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
const mapStateToProps = (state) => ({
  category: state.bookCategoryReducer
});
BookCategories.propTypes = propTypes;
export default connect(mapStateToProps, {
  getBookCategory: getBookCategoryAction,
  getAllBooksByCategory: getAllBooksAction
})(BookCategories);
