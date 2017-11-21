import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import categoryValidation from '../../../utils/categoryValidation';

const propTypes = {
  createBookCategory: PropTypes.func.isRequired
};
/**
 * Class representing a CategoryForm component.
 * @extends React
 */
class CategoryForm extends React.Component {
  /**
  * Create a category.
  * @param {object} props - The properties.
  */
  constructor(props) {
    super(props);
    this.state = {
      category: '',
      isLoading: false,
      errors: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  /**
   * @returns {void}
   * @description update the category field
   * @param {any} event
   * @memberof CategoryForm
   */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
**@description Checks that form is valid
* @return {Boolean} boolean
*/
  validateForm() {
    const { errors, isValid } = categoryValidation(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  /**
 *
 * @return {void} the add  action is dispatched
 * @param {void} event - on click event
 * @memberof create Book category form
 */
  onSubmit(event) {
    event.preventDefault();
    if (this.validateForm()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.createBookCategory(this.state);
      return $('#book-category-form-modal').modal('close');
    }
  }
  /**
   *
   *
   * @returns {object} jsx
   * @memberof CategoryForm
   */
  render() {
    const { errors, isLoading } = this.state;
    return (
      <div id="book-category-form-modal" className="add-book-modal modal">
        <div className="row modal-content">
          <div>CREATE A CATEGORY</div>
          <form onSubmit={this.onSubmit}>
            <div>
              <div className="input-field">
                <input
                  type="text"
                  name="category"
                  className="validate"
                  value={this.state.category}
                  onChange={this.handleChange}
                />
                <span className="error-block">
                  {errors.category}
                </span>
                <label>Category</label>
              </div>
            </div>
            <button
              className="brown darken-4 btn s4"
              type="submit"
              disabled={isLoading}
            >
                Create
            </button>
          </form>
          <button
            className="brown darken-4 modal-close btn col s4 push-s6">
            close
          </button>
        </div>
      </div>
    );
  }
}
CategoryForm.propTypes = propTypes;

export default CategoryForm;
