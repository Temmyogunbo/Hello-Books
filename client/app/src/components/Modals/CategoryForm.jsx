import React from 'react';
import PropTypes from 'prop-types';
import categoryValidation from '../../../utils/categoryValidation';

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
  }
}
  render() {
      const { errors, isLoading } = this.state;
      return (
        <div id="book-category-form-modal" className="add-book-modal modal">
          <div className="modal-content">
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
                type="submit"
                disabled={isLoading}>
                Create
              </button>
            </form>
            <button
              className="modal-close">
              close
              </button>
          </div>
        </div>
      )
    }
}
export default CategoryForm
