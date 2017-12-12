import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import passwordValidation from '../../../utils/passwordValidation';
import TextFieldGroup from './TextFieldGroup';
import Button from '../Button';

const propTypes = {
  changePassword: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired
};
/**
 *
 *
 * @class ChangePasswordForm
 * @extends {React.Component}
 */
class ChangePasswordForm extends React.Component {
  /**
     * Creates an instance of ChangePasswordForm.
     * @param {any} props
     * @memberof ChangePasswordForm
     */
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
      isButtonLoading: false,
      errors: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  /**
   * @returns {void}
   *
   * @memberof ChangePasswordForm
   */
  handleClose() {
    this.setState({
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
      isButtonLoading: false,
      errors: {}
    });
  }
  /**
   *
   *
   * @returns {object} boolean and error object
   * @memberof ChangePasswordForm
   */
  validateForm() {
    const {
      oldPassword,
      newPassword,
      confirmNewPassword
    } = this.state;
    const { errors, isValid } = passwordValidation({
      oldPassword,
      newPassword,
      confirmNewPassword,
    });
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }
  /**
   * @returns {void}
   *
   * @param {any} event
   * @memberof ChangePasswordForm
   */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
   *
   *
   * @param {any} event
   * @returns {void}
   * @memberof ChangePasswordForm
   */
  onSubmit(event) {
    event.preventDefault();
    if (this.validateForm()) {
      const {
        oldPassword,
        newPassword
      } = this.state;
      const {
        changePassword,
        userName
      } = this.props;
      this.setState({ errors: {}, isButtonLoading: true });
      changePassword({
        oldPassword,
        newPassword,
        userName
      });
      this.handleClose();
      return $('#change-password').modal('close');
    }
  }
  /**
   *
   *
   * @returns {object} jsx
   * @memberof ChangePasswordForm
   */
  render() {
    const { errors, isButtonLoading } = this.state;
    return (
      <div id="change-password" className="change-password-modal modal ">
        <div className="row modal-content">
          <div>CHANGE PASSWORD</div>
          <form onSubmit={this.onSubmit}>
            <TextFieldGroup
              label={'Old Password'}
              field={'oldPassword'}
              type={'password'}
              value={this.state.oldPassword}
              handleChange={this.handleChange}
              error={errors.description}
            />
            <TextFieldGroup
              label={'New Password'}
              field={'newPassword'}
              type={'password'}
              value={this.state.newPassword}
              handleChange={this.handleChange}
              error={errors.newPassword}
            />
            <TextFieldGroup
              label={'Confirm New Password'}
              field={'confirmNewPassword'}
              type={'password'}
              value={this.state.confirmNewPassword}
              handleChange={this.handleChange}
              error={errors.confirmNewPassword}
            />
            <Button
              className={"btn brown darken-4 s4"}
              type={"submit"}
              disabled={isButtonLoading}
              children={'save changes'}
            />
          </form>
          <Button
            className={"modal-close btn brown darken-4 col s4 push-s6"}
            onClick={this.handleClose}
            children={'close'}
          />
        </div>
      </div>
    );
  }
}
ChangePasswordForm.propTypes = propTypes;

export default ChangePasswordForm;
