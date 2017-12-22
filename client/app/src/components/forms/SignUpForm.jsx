import React from 'react';
import GoogleLogin from 'react-google-login';
import PropTypes from 'prop-types';

import signUpValidation from '../../../utils/signUpValidation';
import TextFieldGroup from './TextFieldGroup';
import Button from '../Button/index';


const propTypes = {
  signup: PropTypes.func.isRequired,
};
/**It contains state and behaviours for sign up form
 *
 * @class SignUpForm
 *
 * @extends {React.Component}
 */
export class SignUpForm extends React.Component {
  /**
   * Creates an instance of SignUpForm.
   *
   * @param {object} props
   *
   * @memberof SignUpForm
   */
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      userName: '',
      password: '',
      email: '',
      confirmPassword: '',
      isLoading: false,
      errors: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onGoogleCallback = this.onGoogleCallback.bind(this);
  }
  /**
   * It update text fields when prefilled
   *
   * @memberof SignUpForm
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

  /**It validates formn data
   *
   *
   * @returns {Boolean} isValid
   *
   * @memberof SignUpForm
   */
  validateForm() {
    const { errors, isValid } = signUpValidation(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }
  /**It updates name field
   *
   * @returns {undefined}
   *
   * @param {object} event
   *
   * @memberof SignUpForm
   */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**It handles google sign up
   *
   * @returns {object} user's details on google
   *
   * @param {object} response
   *
   * @memberof SignUpForm
   */
  onGoogleCallback(response) {
    this.setState({
      fullName: response.profileObj.name,
      userName: response.profileObj.givenName,
      password: response.profileObj.googleId,
      email: response.profileObj.email,
      confirmPassword: response.profileObj.googleId
    });
    document.getElementById("for-google-signup").click();
  }
  /**It handles form submission
   * @return {undefined}
   *
   * @param {object} event
   *
   * @memberof SignUpForm
   */
  onSubmit(event) {
    event.preventDefault();
    if (this.validateForm()) {
      this.props.signup(this.state);
      this.setState({
        isLoading: false,
      });
    }
  }
  /**It returns form element
   *
   *
   * @returns {object} jsx
   *
   * @memberof SignUpForm
   */
  render() {
    const { errors, isLoading } = this.state;

    return (
      <div className="container">
        <form
          className="col s12 l6  m6 push-l3 push-m3  div-container-form"
          onSubmit={this.onSubmit}
        >
          <h4 className="hide-on-med-and-down sign-title">
          Sign up to HelloBooks:
          </h4>
          <h4 className="hide-on-large-only">Sign up:</h4>
          <TextFieldGroup
            label={'Full Name'}
            field={'fullName'}
            id={'first_name'}
            type={'text'}
            icon={''}
            value={this.state.fullName}
            handleChange={this.handleChange}
            error={errors.fullName}
          />
          <TextFieldGroup
            label={'Username'}
            field={'userName'}
            id={'user_name'}
            type={'text'}
            icon={''}
            value={this.state.userName}
            handleChange={this.handleChange}
            error={errors.userName}
          />
          <TextFieldGroup
            label={'Email'}
            field={'email'}
            id={'email'}
            type={'email'}
            icon={''}
            value={this.state.email}
            handleChange={this.handleChange}
            error={errors.email}
          />
          <TextFieldGroup
            label={'Password'}
            field={'password'}
            id={'password'}
            type={'password'}
            icon={''}
            value={this.state.password}
            handleChange={this.handleChange}
            error={errors.password}
          />
          <TextFieldGroup
            label={'Confirm Password'}
            field={'confirmPassword'}
            id={'confirm_password'}
            type={'password'}
            icon={''}
            value={this.state.confirmPassword}
            handleChange={this.handleChange}
            error={errors.confirmPassword}
          />
          <Button
            id={"for-google-signup"}
            className={"col s4 m4 signup-button"}
            type={"submit"}
            disabled={isLoading}
            children={' Sign up'}
          />
          <div className="col s8 m8 l6">
            <GoogleLogin
              className="right google-button"
              clientId={process.env.GOOGLE_CLIENT_ID}
              onSuccess={this.onGoogleCallback}
            >
              <div className="left">Sign up with</div>
              <img
                className="right"
                width="25"
                height="25"
                role="google fonts"
                src="https://lh3.googleusercontent.com/N-AY2XwXafWq4TQWfua6VyjPVQvTGRdz9CKOHaBl2nu2GVg7zxS886X5giZ9yY2qIjPh=w300"
              />
            </GoogleLogin>
          </div>
          <br />
        </form>
      </div>
    );
  }
}
SignUpForm.propTypes = propTypes;

export default SignUpForm;
