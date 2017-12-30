import React from 'react';
import PropTypes from 'prop-types';

import passwordValidation from '../../../utils/passwordValidation';
import TextFieldGroup from './TextFieldGroup';
import Button from '../Button';

const propTypes = {
  changePassword: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
};

/**It contains state and behaviours for component
 *
 *
 * @class ChangePasswordForm
 *
 * @extends {React.Component}
 */
class ChangePasswordForm extends React.Component {
  /**
     * Creates an instance of ChangePasswordForm.
     *
     * @param {object} props
     *
     * @memberof ChangePasswordForm
     */
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
      isButtonLoading: false,
      errors: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  /**It sets the component state back to its intial
   *
   * @returns {undefined}
   *
   * @memberof ChangePasswordForm
   */
  handleClose() {
    this.setState({
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
      isButtonLoading: false,
      errors: {},
    });
  }
  /**It validates formData
   *
   *
   * @returns {object} boolean and error object
   *
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
  /**It updates the namne field
   * @returns {undefined}
   *
   * @param {object} event
   *
   * @memberof ChangePasswordForm
   */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**It handles submit
   *
   *
   * @param {object} event
   * \
   * @returns {undefined}
   *
   * @memberof ChangePasswordForm
   */
  onSubmit(event) {
    const { $ } = window;
    event.preventDefault();
    if (this.validateForm()) {
      const {
        oldPassword,
        newPassword,
        confirmNewPassword
      } = this.state;
      const {
        changePassword,
        userName
      } = this.props;
      this.setState({ errors: {}, isButtonLoading: true });
      changePassword({
        oldPassword,
        newPassword,
        confirmNewPassword,
        userName,
      });
      this.handleClose();
      return $('#change-password').modal('close');
    }
  }
  /**It returns a div element
   *
   *
   * @returns {object} jsx
   *
   * @memberof ChangePasswordForm
   */
  render() {
    const {
      errors,
      isButtonLoading,
    } = this.state;
    return (
      <div
        id="change-password"
        className="change-password-modal modal container ">
        <div className="row modal-content">
          <h6>CHANGE PASSWORD</h6>
          <form onSubmit={this.onSubmit}>
            <TextFieldGroup
              label={'Old Password'}
              field={'oldPassword'}
              type={'password'}
              id={'oldPassword'}
              value={this.state.oldPassword}
              handleChange={this.handleChange}
              error={errors.oldPassword}
            />
            <TextFieldGroup
              label={'New Password'}
              field={'newPassword'}
              type={'password'}
              id={'newPassword'}
              value={this.state.newPassword}
              handleChange={this.handleChange}
              error={errors.newPassword}
            />
            <TextFieldGroup
              label={'Confirm New Password'}
              field={'confirmNewPassword'}
              type={'password'}
              id={'confirmNewPassword'}
              value={this.state.confirmNewPassword}
              handleChange={this.handleChange}
              error={errors.confirmNewPassword}
            />
            <div className="row">
              <Button
                className={"btn brown darken-4 col s4 m3 l3"}
                type={"submit"}
                id="sub"
                disabled={isButtonLoading}
                children={'save changes'}
              />
              <Button
                className={"modal-close btn brown darken-4 col s3 m3 l3 right"}
                type={'button'}
                id="but"
                children={'close'}
              />
            </div>
          </form>

        </div>
      </div>
    );
  }
}
ChangePasswordForm.propTypes = propTypes;

export default ChangePasswordForm;
