import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import Navigation from './Navigation.jsx';
import { signupAction } from '../../actions/userActions';
import signUpValidation from '../../../../../server/helper/signupValidation';

/**
 *
 *
 * @class SignupPage
 * @extends {React.Component}
 */

class SignUp extends React.Component {
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
  }
  /*
   * This function receives error messages as props from the
   * store if they are any
   * @param {object} nextProps - error object from store
   * @return {void} null
   * @memberof SignupPage
  */
  //componentWillReceiveProps(nextProps) {
    //this.setState({ errors: nextProps.error });
  // }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
	 * @description Checks that form is valid
	 * @return {Boolean}
	 */
  validateForm() {
    const { errors, isValid } = signUpValidation(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  /**
   *
   * @return {void} - dispatches the action
   * @param {void} event - null
   * @memberof SignupPage
   */
  onSubmit(event) {
    if (this.validateForm()) {
      this.setState({ errors: {}, isLoading: true });
      event.preventDefault();
      this.props.signup(this.state).then((error) => {
        if (error) {
          this.setState({ errors: error.data.message, isLoading: false });
          toastr.error(error.response.data.message);
        } else {
          this.setState({ errors: {}, isLoading: true });
          this.props.history.replace('/');
          toastr.success('You have successfully signed up');
        }
      });
    }
  }
  /**
	 * @description Renders content to the screen
	 * @return {void}
	 */
  render() {
    const { errors, isLoading } = this.state;
    return (
      <div>
        <Navigation about='About us' contact='Contact us' sign='Log in' whereTo="/signin"/>
        <h4 className='sign-up-title'>Sign up to HelloBooks:</h4>
        <div className="row div-container-signup-form">
          <form className="col.s12" onSubmit={this.onSubmit}>
            <div className="row">
              <div className="input-field col.s5">
                <label htmlFor="first_name">Full Name</label>
                <input
                  name="fullName" id="first_name" type="text"
                  className="validate"value={this.state.name}
                  onChange={this.handleChange} />
                <span className="error-block">
                  {errors.fullName}
                </span>
              </div>
            </div>
            <div className="row">
              <div className="input-field col.s5">
                <label htmlFor="first_name">Username</label>
                <input
                  name="userName" id="user_name" type="text"
                  className="validate" value={this.state.name}
                  onChange={this.handleChange} />
                <span className="error-block">
                  {errors.userName}
                </span>
              </div>
            </div>
            <div className="row">
              <div className="input-field col.s5">
                <label htmlFor="email">Email</label>
                <input
                  name="email" id="email" type="email"
                  className="validate" value={this.state.name}
                  onChange={this.handleChange} />
                <span className="error-block">
                  {errors.email}
                </span>
              </div>
            </div>
            <div className="row">
              <div className="input-field col.s5">
                <input
                  name="password" type="password" className="validate"
                  value={this.state.name} id="password"
                  onChange={this.handleChange} />
                <span className="error-block">
                  {errors.password}
                </span>
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col.s5">
                <input
                  name="confirmPassword" type="password"
                  className="validate" value={this.state.name}
                  id="confirm_password" onChange={this.handleChange} />
                <span className="error-block">
                  {errors.confirmPassword}
                </span>
                <label htmlFor="password">Confirm password</label>
              </div>
            </div>
            <button
              className="login-button" type="submit"
              disabled={isLoading}>
              Sign up
            </button>
            <br />
            <br />
          </form>
        </div>
      </div>
    );
  }
}
SignUp.propTypes = {
  history: PropTypes.object.isRequired,
  signup: PropTypes.func.isRequired
};
const mapDispatchToProps = dispatch => ({
  signup: signupCredentials => dispatch(signupAction(signupCredentials))
});

export default connect(null,
  mapDispatchToProps)(withRouter(SignUp));
