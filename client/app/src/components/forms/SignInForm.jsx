import React from 'react';
import PropTypes from 'prop-types';
import GoogleLogin from 'react-google-login';

import signInValidation from '../../../utils/signInValidation';
import TextFieldGroup from './TextFieldGroup';
import Button from '../Button/index';

const propTypes = {
  signin: PropTypes.func.isRequired,
};
/**It contains state and methods for SignInForm component
 *
 * @class SignInForm
 *
 * @extends {React.Component}
 */
export class SignInForm extends React.Component {
  /**
     * Creates an instance of SignInForm.
     *
     * @param {any} props
     *
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
    this.onGoogleCallback = this.onGoogleCallback.bind(this);
  }
  /**It hanldes google log in
   *
   * @returns {object} user's details on google
   *
   * @param {any} response
   *
   * @memberof SignInForm
   */
  onGoogleCallback(response) {
    this.setState({
      userName: response.profileObj.givenName,
      password: response.profileObj.googleId
    });
    document.getElementById("for-google-log-in").click();
  }
  /**It updates the name field
   *
   * @returns {void}
   *
   * @param {any} event
   *
   * @memberof SignInForm
   */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**It validates form data
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
  /**It handles form submission
   *
   * @return {void} the login action is dispatched
   *
   * @param {any} event
   *
   * @memberof SignInForm
   */
  onSubmit(event) {
    event.preventDefault();
    if (this.validateForm()) {
      this.props.signin(this.state);
    }
  }
  /**It returns form element
   *
   *
   * @returns {object} jsx
   *
   * @memberof SignInForm
   */
  render() {
    const { errors, isLoading } = this.state;

    return (
      <div className="container">
        <form
          className="col s12 m6 l6 push-l4 div-container-form"
          onSubmit={this.onSubmit}
        >
          <h3 className="sign-title">Log in:</h3><br />
          <TextFieldGroup
            label={'Username'}
            field={'userName'}
            id={'first_name'}
            type={'text'}
            icon={'person'}
            value={this.state.userName}
            handleChange={this.handleChange}
            error={errors.userName}
          />
          <TextFieldGroup
            label={'Password'}
            field={'password'}
            id={'password'}
            type={'password'}
            icon={'lock'}
            value={this.state.password}
            handleChange={this.handleChange}
            error={errors.password}
          />
          <div className="row">
            <Button
              id={"for-google-log-in"}
              type={'submit'}
              group="login-button"
              dataAction="log-in-form"
              disabled={isLoading}
              className="col s4 m4 login-button btn"
              children={' Log in'}
            />
            <div className="col s8 m8 l6">
              <GoogleLogin
                className="right google-button"
                clientId={process.env.GOOGLE_CLIENT_ID}
                onSuccess={this.onGoogleCallback}
              >
                <div className="left">Log in with</div>
                <img
                  className="google-icon"
                  width="30"
                  height="27"
                  role="google fonts"
                  src="https://lh3.googleusercontent.com/N-AY2XwXafWq4TQWfua6VyjPVQvTGRdz9CKOHaBl2nu2GVg7zxS886X5giZ9yY2qIjPh=w300"
                />
              </GoogleLogin>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
SignInForm.propTypes = propTypes;
export default SignInForm;