import React from 'react';
import PropTypes from 'prop-types';
import cloudinary from 'cloudinary';
import addBookValidation from '../../../../../server/helper/addBookValidation';

cloudinary.config({
  cloud_name: process.env.APP_CLOUD_NAME,
  api_key: process.env.APP_API_KEY,
  api_secret: process.env.APP_API_SECRET
});

class BookForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: '',
      description: '',
      title: '',
      author: '',
      quantity: '',
      imageUrl: '',
      isLoading: false,
      isButtonLoading: true,
      errors: {}
    }
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.uploadToCloudinary = this.uploadToCloudinary.bind(this);

  }
  uploadToCloudinary(event) {
    event.preventDefault();
    this.setState({
      isLoading: true
    })
    const { files } = $(event.target)[0];
    if (/^image/.test(files[0].type)) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = (result) =>
        cloudinary.v2.uploader.upload(result.target.result,
          (error, response) => {
            if (error) {
              this.setState({
                imageUrl: response.secure_url,
                isButtonLoading: false,
                isLoading: false
              })
              console.log(error);
            }
            this.setState({
              imageUrl: response.secure_url,
              isButtonLoading: false,
              isLoading: false
            })
            console.log('yeeeeee', response);
            console.log(this.state)
          });
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
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
      this.setState({ errors: {}, isButtonLoading: true });
      this.props.addBook(this.state);
    }
  }
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
        <div className="modal-content">
          <div>ADD BOOK BY CATEGORY</div>
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
              <img src={this.state.imageUrl} style={{width: 100 +'px', height: 100 + 'px'}} />}
            <div className="row">
              <div className="col sm-4">
                <button
                  className="btn red-bg"
                  type="submit"
                  disabled={isButtonLoading}>
                  ADD BOOK
            </button>
              </div>
              <div className="col sm-4">
                <input
                  id="filedisplay"
                  style={{ display: "none" }}
                  type="file"
                  onChange={this.uploadToCloudinary}
                />
                <button type="button"
                  onClick={() => document.getElementById('filedisplay').click()}
                  className="btn">
                  <i className="material-icons">image</i>
                </button>
                {this.state.isLoading &&
                  <i className="isLoading fa fa-spin fa-spinner" aria-hidden="true"></i>
                }
              </div>
            </div>
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
BookForm.PropTypes = {
  categories: PropTypes.array.isRequired,
  category: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired
};
export default BookForm;
