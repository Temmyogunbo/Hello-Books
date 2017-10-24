import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import addBookValidation from '../../../../../server/helper/addBookValidation';

class EditBookForm extends React.Component {
  constructor(props) {
    super(props);
    console.log('see it here', this.props)
    this.state = {
      category: '',
      title: this.props.book.title,
      author: '',
      quantity: '',
      imageUrl: '',
      isLoading: false,
      errors: {}
    }
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.book !== this.props.book) {
      this.setState({ title: nextProps.book.title })
    }
  }
  /**
**@description Checks that form is valid
* @return {Boolean} boolen
*/
  validateForm() {
    const { errors, isValid } = addBookValidation(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  /**
 *
 * @return {void} the add book action is dispatched
 * @param {void} event - on click event
 * @memberof add Book form
 */
  onSubmit(event) {
    event.preventDefault();
    if (this.validateForm()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.addbook(this.state);
    }
  }
  render() {
    console.log('you work with this', this.props.book)
    const { errors, isLoading } = this.state;
    const categoryItems = this.props.categories.map(category => (
      <option
        key={category.id}
      >
        {category.category}
      </option>
    ));
    return (
      <div id="edit-book-modal" className="edit-book-modal modal">
        <div className="modal-content">
          <div>EDIT BOOK BY CATEGORY</div>
          <form onSubmit={this.onSubmit}>
            <div>
              <label>Category</label>
              <span className="error-block">
                {errors.category}
              </span>
            </div>
            <div>
              <div className="input-field">
                <input
                  type="text"
                  name="title"
                  className="validate"
                  value={this.state.title}
                  onChange={this.handleChange}
                />
                <span className="error-block">
                  {errors.title}
                </span>
                <label >Title</label>
              </div>
            </div>
            <div>
              <div className="input-field">
                <span className="error-block">
                  {errors.author}
                </span>
                <label>Author</label>
              </div>
            </div>
            <div>
              <div className="input-field">
                <span className="error-block">
                  {errors.quantity}
                </span>
                <label>Quantity</label>
              </div>
            </div>
            <div>
              <div className="file-field input-field">
                <div className="btn">
                  <span>EDIT Book Cover</span>
                </div>
                <div className="file-path-wrapper">
                  <input
                    className="file-path validate"
                    type="text"
                  />
                  <span className="error-block">
                    {errors.imageUrl}</span>
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}>
              EDIT BOOK
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
EditBookForm.PropTypes = {
  categories: PropTypes.array.isRequired,
  category: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired
};
export default EditBookForm;
