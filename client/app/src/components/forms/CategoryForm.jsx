import React from 'react';
import PropTypes from 'prop-types';

import categoryValidation from '../../../utils/categoryValidation';
import TextFieldGroup from './TextFieldGroup';
import Button from "../Button";

const propTypes = {
  createBookCategory: PropTypes.func.isRequired
};
/**
 * Class representing a CategoryForm component.
 *
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
    this.handleClose = this.handleClose.bind(this);
  }

  /**It handles some component component state
   *
   * @return {void}
   *
   * @memberof CategoryForm
   */
  handleClose() {
    this.setState({
      errors: {},
      isLoading: false,
      category: ''
    });
  }

  /**It updates the name field
   *
   * @returns {void}
   *
   * @param {any} event
   *
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

  /**It handles submit
 *
 * @return {void} the add  action is dispatched
 *
 * @param {void} event - on click event
 *
 * @memberof create Book category form
 */
  onSubmit(event) {
    const { $ } = window;
    event.preventDefault();
    if (this.validateForm()) {
      this.props.createBookCategory(this.state);
      this.handleClose();
      return $('#book-category-form-modal').modal('close');
    }
  }
  /**It returns a div element
   *
   *
   * @returns {object} jsx
   *
   * @memberof CategoryForm
   */
  render() {
    const { errors, isLoading } = this.state;
    return (
      <div id="book-category-form-modal" className="add-book-modal modal">
        <div className="row modal-content">
          <div>CREATE A CATEGORY</div>
          <form onSubmit={this.onSubmit}>
            <TextFieldGroup
              label={'Category'}
              field={'category'}
              type={'text'}
              value={this.state.category}
              handleChange={this.handleChange}
              error={errors.category}
            />
            <div className="row">
              <Button
                className={"brown darken-4 btn col s4 m3 l3"}
                type={"submit"}
                disabled={isLoading}
                children={'Create'}
              />
              <Button
                className="brown darken-4 modal-close btn col ss3 m3 l3 right"
                onClick={this.handleClose}
                children={'close'}
                type={'button'}
              />
            </div>
          </form>

        </div>
      </div>
    );
  }
}
CategoryForm.propTypes = propTypes;

export default CategoryForm;
