import React from 'react';
import PropTypes from 'prop-types';
import signInValidation from '../../../utils/signInValidation';
import TextFieldGroup from './TextFieldGroup';

const propTypes = {
  signin: PropTypes.func.isRequired,
};
/**
 *
 *
 * @class SignInForm
 * @extends {React.Component}
 */
class SignInForm extends React.Component {
  /**
     * Creates an instance of SignInForm.
     * @param {any} props
     * @memberof SignInForm
     */
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      errors: {},
      isLoading: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * @returns {void}
   *
   * @param {any} event
   * @memberof SignInForm
   */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
   *
   *
   * @returns {Boolean} isValid
   * @memberof SignInForm
   */
  validateForm() {
    const { errors, isValid } = signInValidation(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }
  /**
   * @return {void} the login action is dispatched
   *
   * @param {any} event
   * @memberof SignInForm
   */
  onSubmit(event) {
    event.preventDefault();
    if (this.validateForm()) {
      this.props.signin(this.state);
    }
  }
  /**
   *
   *
   * @returns {object} jsx
   * @memberof SignInForm
   */
  render() {
    const { errors, isLoading } = this.state;

    return (
      <form
        className="col s6 push-s3 l4 push-l4 div-container-form"
        onSubmit={this.onSubmit}
      >
        <h3 className="sign-title">Log in:</h3>
        <div className="row">
          <TextFieldGroup
            label={'Username'}
            field={'userName'}
            id={'first_name'}
            type={'text'}
            icon={'person'}
            value={this.state.name}
            handleChange={this.handleChange}
            error={errors.userName}
          />
        </div>
        <div className="row">
          <TextFieldGroup
            label={'Password'}
            field={'password'}
            id={'password'}
            type={'password'}
            icon={'lock'}
            value={this.state.name}
            handleChange={this.handleChange}
            error={errors.password}
          />
        </div>
        <button
          className="login-button" type="submit"
          data-action="log-in-form"
          disabled={isLoading}>
                  Log in
        </button>
      </form>
    );
  }
}
SignInForm.propTypes = propTypes;
export default SignInForm;
