import React from 'react';
import PropTypes from 'prop-types';
import cloudinary from 'cloudinary';
import $ from "jquery";
import bookValidation from '../../../utils/bookValidation';

cloudinary.config({
  cloud_name: process.env.APP_CLOUD_NAME,
  api_key: process.env.APP_API_KEY,
  api_secret: process.env.APP_API_SECRET
});

const propTypes = {
  book: PropTypes.object.isRequired,
  editBook: PropTypes.func.isRequired,
  addBook: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired
};
/**
 * 
 * 
 * @class BookForm
 * @extends {React.Component}
 */
class BookForm extends React.Component {
  /**
   * Creates an instance of BookForm.
   * @param {any} props 
   * @memberof BookForm
   */
  constructor(props) {
    super(props);
    this.state = {
      imagePublicId: '',
      bookId: '',
      bookHead: 'ADD BOOK BY CATEGORY',
      buttonText: 'ADD BOOK',
      isEdit: false,
      category: '',
      description: '',
      title: '',
      author: '',
      quantity: '',
      imageUrl: '',
      isLoading: false,
      isButtonLoading: true,
      errors: {}
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.uploadToCloudinary = this.uploadToCloudinary.bind(this);
  }
  /**
 * @returns {void}
 * 
 * @param {any} nextProps 
 * @memberof BookForm
 */
  componentWillReceiveProps(nextProps) {
    if (nextProps.book.id) {
      this.setState({
        description: nextProps.book.description,
        bookId: nextProps.book.id,
        category: nextProps.book.category,
        title: nextProps.book.title,
        quantity: nextProps.book.quantity,
        author: nextProps.book.author,
        imageUrl: nextProps.book.imageUrl,
        bookHead: "EDIT BOOK BY CATEGORY",
        buttonText: 'EDIT BOOK',
        isEdit: true,
        isButtonLoading: false
      });
    }
  }
  /**
 * @returns {void} 
 * @description- it uploads images to cloudinary
 * 
 * @param {any} event 
 * @memberof BookForm
 */
  uploadToCloudinary(event) {
    event.preventDefault();
    this.setState({
      isLoading: true
    });
    const { files } = $(event.target)[0];
    if (/^image/.test(files[0].type)) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = (result) => {
        cloudinary.v2.uploader.upload(result.target.result,
          (error, response) => {
            if (error) {
              this.setState({
                imageUrl: response.secure_url,
                isButtonLoading: false,
                isLoading: false
              });
              console.log(error);
            }
            this.setState({
              imagePublicId: response.public_id,
              imageUrl: response.secure_url,
              isButtonLoading: false,
              isLoading: false
            });
          });
      };
    }
  }
  /**
   * @returns {void} 
   * @description- it sets an instance of
   * BookForm back to its initial state
   * 
   * @memberof BookForm
   */
  handleClose() {
    this.setState({
      bookId: '',
      category: '',
      description: '',
      title: '',
      author: '',
      quantity: '',
      bookHead: 'ADD BOOK BY CATEGORY',
      buttonText: 'ADD BOOK',
      isEdit: false,
      isButtonLoading: true
    });
  }
  /**
   * @returns {void} description- it updates an instance
   * of BookForm go its current state
   * 
   * @param {any} event 
   * @memberof BookForm
   */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
  **@description Checks that form is valid
  * @return {Boolean} boolean
  */
  validateForm() {
    const { errors, isValid } = bookValidation(this.state);
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
      this.setState({ errors: {}, isButtonLoading: true });
      const {
        category,
        quantity,
        description,
        imageUrl,
        title,
        author,
        bookId,
        imagePublicId
      } = this.state;
      if (this.state.isEdit) {
        this.props.editBook({
          category,
          quantity,
          description,
          imageUrl,
          title,
          author,
          bookId,
          imagePublicId
        });
        this.handleClose();
        return $('#book-form-modal').modal('close');
      }
      this.props.addBook({
        category,
        quantity,
        description,
        imageUrl,
        title,
        author,
        imagePublicId
      });
      this.handleClose();
      return $('#book-form-modal').modal('close');
    }
  }
  /**
   * 
   * 
   * @returns {object} jsx
   * @memberof BookForm
   */
  render() {
    const { errors, isButtonLoading } = this.state;
    const categoryItems = this.props.categories.map(category => (
      <option
        key={category.id}
      >
        {category.category}
      </option>
    ));
    return (
      <div id="book-form-modal" className="add-book-modal modal">
        <div className="row modal-content">
          <div>{this.state.bookHead}</div>
          <form onSubmit={this.onSubmit}>
            <div>
              <label>Category</label>
              <select
                className="browser-default"
                onChange={this.handleChange}
                name="category"
                value={this.state.category}>
                <option>Select a category</option>
                {categoryItems}
              </select>
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
                <input
                  name="author"
                  type="text"
                  className="validate"
                  value={this.state.author}
                  onChange={this.handleChange}
                />
                <span className="error-block">
                  {errors.author}
                </span>
                <label>Author</label>
              </div>
            </div>
            <div>
              <div className="input-field">
                <input
                  type="text"
                  name="quantity"
                  className="validate"
                  value={this.state.quantity}
                  onChange={this.handleChange}
                />
                <span className="error-block">
                  {errors.quantity}
                </span>
                <label>Quantity</label>
              </div>
            </div>
            <div>
              <div className="input-field">
                <input
                  type="text"
                  name="description"
                  className="validate"
                  value={this.state.description}
                  onChange={this.handleChange}
                />
                <span className="error-block">
                  {errors.description}
                </span>
                <label>Description</label>
              </div>
            </div>
            {!this.state.isButtonLoading &&
              <img
                src={this.state.imageUrl}
                style={{ width: `${100}px`, height: `${100}px` }} />}
            <div className="row">
              <div className="col sm-4">
                <button
                  className="btn red-bg bc btn"
                  type="submit"
                  disabled={isButtonLoading}
                >
                  {this.state.buttonText}
                </button>
              </div>
              <div className="col">
                <input
                  id="filedisplay"
                  style={{ display: "none" }}
                  type="file"
                  onChange={this.uploadToCloudinary}
                />
                <button type="button"
                  onClick={() => document.getElementById('filedisplay').click()}
                  className="btn bc">
                  <i className="material-icons">image</i>
                </button>
                {this.state.isLoading &&
                  <i
                    className="isLoading fa fa-spin fa-spinner"
                    aria-hidden="true"
                  />
                }
              </div>
            </div>
          </form>
          <button
            onClick= {this.handleClose}
            className="waves-effect waves-light btn bc modal-close">
            close
          </button>
        </div>
      </div>
    );
  }
}
BookForm.propTypes = propTypes;
export default BookForm;
