import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import passwordValidation from '../../../utils/passwordValidation';

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
      isButtonLoading: '',
      errors: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
      this.setState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
        isButtonLoading: '',
        errors: {}
      });
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
      <div id="change-password" className="change-password-modal modal">
        <div className="row modal-content">
          <div>CHANGE PASSWORD</div>
          <form onSubmit={this.onSubmit}>
            <div>
              <div className="input-field">
                <input
                  type="text"
                  name="oldPassword"
                  className="validate"
                  value={this.state.oldPassword}
                  onChange={this.handleChange}
                />
                <span className="error-block">
                  {errors.oldPassword}
                </span>
                <label>Old Password:</label>
              </div>
              <div className="input-field">
                <input
                  type="text"
                  name="newPassword"
                  className="validate"
                  value={this.state.newPassword}
                  onChange={this.handleChange}
                />
                <span className="error-block">
                  {errors.newPassword}
                </span>
                <label>New Password</label>
              </div>
              <div className="input-field">
                <input
                  type="text"
                  name="confirmNewPassword"
                  className="validate"
                  value={this.state.confirmNewPassword}
                  onChange={this.handleChange}
                />
                <span className="error-block">
                  {errors.confirmNewPassword}
                </span>
                <label>Confirm New Password</label>
              </div>
            </div>
            <button
              className="btn brown darken-4 s4"
              type="submit"
              disabled={isButtonLoading}
            >
                        save changes
            </button>
          </form>
          <button
            className="modal-close btn brown darken-4 col s4 push-s6">
                    close
          </button>
        </div>
      </div>
    );
  }
}
PasswordForm.propTypes = propTypes;

export default ChangePasswordForm;
