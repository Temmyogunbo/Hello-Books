import React from 'react';
import GoogleLogin from 'react-google-login';
import PropTypes from 'prop-types';
import signUpValidation from '../../../utils/signUpValidation';
import TextFieldGroup from './TextFieldGroup';
import Button from '../Button/index';


const propTypes = {
  signup: PropTypes.func.isRequired,
};
/**
 *
 *
 * @class SignUpForm
 * @extends {React.Component}
 */
export class SignUpForm extends React.Component {
  /**
   * Creates an instance of SignUpForm.
   * @param {any} props
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
   *
   *
   * @returns {Boolean} isValid
   * @memberof SignUpForm
   */
  validateForm() {
    const { errors, isValid } = signUpValidation(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }
  /**
   * @returns {void}
   *
   * @param {any} event
   * @memberof SignUpForm
   */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
   * @returns {void}
   *
   * @param {any} response
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
  /**
   * @return {void} - dispatches the action
   *
   * @param {any} event
   * @memberof SignUpForm
   */
  onSubmit(event) {
    event.preventDefault();
    if (this.validateForm()) {
      this.props.signup(this.state);
      this.setState({
        fullName: '',
        userName: '',
        password: '',
        email: '',
        confirmPassword: '',
        isLoading: false,
        errors: {}
      });
    }
  }
  /**
   *
   *
   * @returns {object} jsx
   * @memberof SignUpForm
   */
  render() {
    const { errors, isLoading } = this.state;

    return (
      <form
        className="col s6 l4  m4 push-m4 push-s3 push-l4 div-container-form"
        onSubmit={this.onSubmit}
      >
        <h4 className="sign-title">Sign up to HelloBooks:</h4>
        <div className="row">
          <TextFieldGroup
            label={'Full Name'}
            field={'fullName'}
            id={'first_name'}
            type={'text'}
            icon={''}
            value={this.state.name}
            handleChange={this.handleChange}
            error={errors.fullName}
          />
        </div>
        <div className="row">
          <TextFieldGroup
            label={'Username'}
            field={'userName'}
            id={'first_name'}
            type={'text'}
            icon={''}
            value={this.state.name}
            handleChange={this.handleChange}
            error={errors.userName}
          />
        </div>
        <div className="row">
          <TextFieldGroup
            label={'Email'}
            field={'email'}
            id={'email'}
            type={'email'}
            icon={''}
            value={this.state.name}
            handleChange={this.handleChange}
            error={errors.email}
          />
        </div>
        <div className="row">
          <TextFieldGroup
            label={'Password'}
            field={'password'}
            id={'password'}
            type={'password'}
            icon={''}
            value={this.state.name}
            handleChange={this.handleChange}
            error={errors.password}
          />
        </div>
        <div className="row">
          <TextFieldGroup
            label={'Confirm Password'}
            field={'confirmPassword'}
            id={'confirm_password'}
            type={'password'}
            icon={''}
            value={this.state.name}
            handleChange={this.handleChange}
            error={errors.confirmPassword}
          />
        </div>
        <div className="row">
          <Button
            id={"for-google-signup"}
            className={"col s12 m3 signup-button"}
            type={"submit"}
            disabled={isLoading}
            children={' Sign up'}
          />
          <div className="col s12 m9">
            <GoogleLogin
              className="right google-button"
              clientId={process.env.GOOGLE_CLIENT_ID}
              onSuccess={this.onGoogleCallback}
            >
              <div className="left">Sign up with</div>
              <img
                className="right google-icon"
                width="30"
                height="30"
                role="google fonts"
                src="https://lh3.googleusercontent.com/N-AY2XwXafWq4TQWfua6VyjPVQvTGRdz9CKOHaBl2nu2GVg7zxS886X5giZ9yY2qIjPh=w300"
              />
            </GoogleLogin>
          </div>
        </div>
        <br />

      </form>
    );
  }
}
SignUpForm.propTypes = propTypes;

export default SignUpForm;
