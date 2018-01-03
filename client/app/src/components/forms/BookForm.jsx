import React from 'react';
import PropTypes from 'prop-types';
import cloudinary from 'cloudinary';
import swal from "sweetalert2";

import bookValidation from '../../../utils/bookValidation';
import TextFieldGroup from './TextFieldGroup';
import SelectInputField from './SelectInputField';
import Button from '../Button';
import settings from '../../../utils/cloudinarySettings';

cloudinary.config(settings);

const propTypes = {
  book: PropTypes.object.isRequired,
  editBook: PropTypes.func.isRequired,
  addBook: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
};
/**It contains method and behaviours for BookForm component
 *
 *
 * @class BookForm
 *
 * @extends {React.Component}
 */
class BookForm extends React.Component {
  /**
   * Creates an instance of BookForm.
   *
   * @param {object} props
   *
   * @memberof BookForm
   */
  constructor(props) {
    super(props);
    this.state = {
      imagePublicId: '',
      id: '',
      bookHead: 'ADD BOOK BY CATEGORY',
      buttonText: 'ADD BOOK',
      isEdit: false,
      category: '',
      description: '',
      title: '',
      author: '',
      quantity: 0,
      imageUrl: '',
      isLoading: false,
      isButtonLoading: true,
      errors: {},
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.uploadToCloudinary = this.uploadToCloudinary.bind(this);
  }
  /**It sets new state for description, id,
   * category, quantity, author, title, imageUrl,
   * imagePublicId, bookHead, buttonText, isEdit, and isButtonLoading
   * on receiving new properties
   *
 * @returns {undefined}
 *
 * @param {object} nextProps
 *
 * @memberof BookForm
 */
  componentWillReceiveProps(nextProps) {
    if (nextProps.book && nextProps.book.id) {
      this.setState({
        description: nextProps.book.description,
        id: nextProps.book.id,
        category: nextProps.book.category,
        title: nextProps.book.title,
        quantity: nextProps.book.quantity,
        author: nextProps.book.author,
        imageUrl: nextProps.book.imageUrl,
        imagePublicId: nextProps.book.imagePublicId,
        bookHead: "EDIT BOOK BY CATEGORY",
        buttonText: 'EDIT BOOK',
        isEdit: true,
        isButtonLoading: false,
      });
    }
  }
  /**
 * It update text fields when prefilled
 *
 * @memberof BookForm
 *
 * @returns {undefined}
 */
  componentDidUpdate() {
    this.var = '';
    const { $ } = window;
    $(document).ready(() => {
      Materialize.updateTextFields();
    });
  }
  /**This functions reads image and uploads to cloudinary
   *
 * @returns {undefined}
 *
 * @description- it uploads images to cloudinary
 *
 * @param {object} event
 *
 * @memberof BookForm
 */
  uploadToCloudinary(event) {
    event.preventDefault();
    this.setState({
      isLoading: true,
    });
    const { $ } = window;
    const { files } = $(event.target)[0];
    if (/^image/.test(files[0].type)) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = (result) => {
        if (this.state.isEdit) {
          cloudinary.uploader.destroy(
            this.state.imagePublicId,
            () => {}
          );
        }
        cloudinary.v2.uploader.upload(
          result.target.result,
          (error, response) => {
            if (error) {
              this.setState({
                imageUrl: response.secure_url,
                isButtonLoading: false,
                isLoading: false
              });
            }
            this.setState({
              imagePublicId: response.public_id,
              imageUrl: response.secure_url,
              isButtonLoading: false,
              isLoading: false,
            });
          }
        );
      };
    } else {
      this.handleClose();
      return $('#book-form-modal').modal('close');
      swal('The file type is not allowed')
        .catch(swal.noop);
    }
  }
  /**It returns states back to its default
   *
   * @returns {undefined}
   *
   * BookForm back to its initial state
   *
   * @memberof BookForm
   */
  handleClose() {
    const { $ } = window;
    this.setState({
      id: '',
      category: '',
      description: '',
      title: '',
      author: '',
      quantity: 0,
      bookHead: 'ADD BOOK BY CATEGORY',
      buttonText: 'ADD BOOK',
      isEdit: false,
      isLoading: false,
      isButtonLoading: true,
      imageUrl: '',
    }, () => $('#book-form-modal').modal('close'));
  }
  /**It updates user input
   *
   * @returns {undefined} description- it updates an instance
   * of BookForm go its current state
   *
   * @param {object} event
   *
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

  /**It handles submit
 *
 * @return {undefined} the add book action is dispatched
 *
 * @param {object} event - on click event
 *
 * @memberof add Book form
 */
  onSubmit(event) {
    event.preventDefault();
    const { $ } = window;
    if (this.validateForm()) {
      const {
        category,
        quantity,
        description,
        imageUrl,
        title,
        author,
        id,
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
          id,
          imagePublicId,
        }).then((response) => {
          if (response && response.status < 400) {
            this.handleClose();
            return $('#book-category-form-modal').modal('close');
          }
        });
        this.setState({ errors: {}, });
      } else {
        this.props.addBook({
          category,
          quantity,
          description,
          imageUrl,
          title,
          author,
          imagePublicId,
        }).then((response) => {
          if (response && response.status < 400) {
            this.handleClose();
            return $('#book-category-form-modal').modal('close');
          }
        });
        this.setState({ errors: {}, });
      }
    }
  }
  /**It returns a div element
   *
   *
   * @returns {object} jsx
   *
   * @memberof BookForm
   */
  render() {
    const { errors, isButtonLoading } = this.state;
    return (
      <div id="book-form-modal" className="add-book-modal modal">
        <div className="row modal-content">
          <h6>{this.state.bookHead}</h6>
          <form onSubmit={this.onSubmit}>
            <SelectInputField
              label={'category'}
              field={'category'}
              items={this.props.categories}
              handleChange={this.handleChange}
              value={this.state.category}
              error={errors.category}
            />
            <TextFieldGroup
              label={'Title'}
              field={'title'}
              type={'text'}
              value={this.state.title}
              handleChange={this.handleChange}
              error={errors.title}
            />
            <TextFieldGroup
              label={'Author'}
              field={'author'}
              type={'text'}
              value={this.state.author}
              handleChange={this.handleChange}
              error={errors.author}
            />
            <TextFieldGroup
              label={'Quantity'}
              field={'quantity'}
              type={'text'}
              value={this.state.quantity}
              handleChange={this.handleChange}
              error={errors.quantity}
            />
            <TextFieldGroup
              label={'Description'}
              field={'description'}
              type={'text'}
              textArea={this.state.description}
              handleChange={this.handleChange}
              error={errors.description}
            />
            {!this.state.isButtonLoading &&
              <img
                src={this.state.imageUrl}
                style={{ width: `${100}px`, height: `${100}px` }}
              />}
            <div className="row">
              <div className="col sm-4">
                <Button
                  className={"btn red-bg bc btn"}
                  type={"submit"}
                  disabled={isButtonLoading}
                  children={this.state.buttonText}

                />
              </div>
              <div>
                <input
                  id="filedisplay"
                  style={{ display: "none" }}
                  type="file"
                  onChange={this.uploadToCloudinary}
                />
                <Button
                  type={"button"}
                  onClick={() => document.getElementById('filedisplay').click()}
                  className={"btn brown darken-4"}
                  icon={'image'}

                />
                {this.state.isLoading &&
                  <i
                    className="isLoading fa fa-spin fa-spinner"
                    aria-hidden="true"
                  />
                }
              </div>
            </div>
          </form>
          <Button
            onClick={this.handleClose}
            className={"btn brown darken-4 modal-close"}
            children={'close'}
          />
        </div>
      </div>
    );
  }
}
BookForm.propTypes = propTypes;
export default BookForm;
