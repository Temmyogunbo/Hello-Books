import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import Navigation from './Navigation.jsx';
import signupAction from '../../actions/userActions';

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
      firstName: '',
      lastName: '',
      userName: '',
      password: '',
      confirmPassword: '',
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
  componentWillReceiveProps(nextProps) {
    this.setState({ errors: nextProps.error });
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   *
   * @return {void} - dispatches the action
   * @param {void} event - null
   * @memberof SignupPage
   */
  onSubmit(event) {
    this.setState({ errors: {} });
    event.preventDefault();
    this.props.signup(this.state).then(() => {
      if (Object.keys(this.props.error).length === 0) {
        this.props.history.push('/');
        toastr.success('You have successfully signed up');
      } else {
        this.props.history.push('/signup');
      }
    });
  }
  render() {
    const { errors } = this.state;
    return (
      <div>
        <Navigation about='About us' contact='Contact us' signup='Log in' />
        <div className="row div-container-signup-form">
          <form className="col.s12" onSubmit={this.onSubmit}>
            <div className="row">
              <div className="input-field col.s5">
                {errors.firstName &&
                  <span className="error-block">{errors.firstName}</span>}
                <label htmlFor="first_name">First Name</label>
                <input name='firstName' id="first_name" type="text" className="validate" value={this.state.name} onChange = {this.handleChange} />
              </div>
            </div>
              <div className="row">
              <div className="input-field col.s5">
                {errors.lastName &&
                   <span className="error-block">{errors.lastName}</span>}
                <label htmlFor="last_name">Last Name</label>
                <input name='lastName' id="last_name" type="text" className="validate" value={this.state.name} onChange = {this.handleChange} />
              </div>
            </div>
            <div className="row">
              <div className="input-field col.s5">
                {errors.userName &&
                   <span className="error-block">{errors.userName}</span>}
                <label htmlFor="first_name">Username</label>
                <input name='userName' id="user_name" type="text" className="validate" value={this.state.name} onChange = {this.handleChange} />
              </div>
            </div>
              <div className="row">
              <div className="input-field col.s5">
                {errors.email &&
                   <span className="error-block">{errors.email}</span>}
                <label htmlFor="email">Email</label>
                <input name='email' id="email" type="email" className="validate" value={this.state.name} onChange = {this.handleChange} />
              </div>
            </div>
            <div className="row">
              <div className="input-field col.s5">
                <input name='password' type="password" className="validate"
                  value={this.state.name} id='password' onChange={this.handleChange}/>
                <label htmlFor="password">Password</label>
                {errors.password &&
                   <span className="error-block">{errors.password}</span>}
              </div>
            </div>
            <div className="row">
              <div className="input-field col.s5">
                <input name='confirmPassword' type="password" className="validate"
                  value={this.state.name} id='confirm_password' onChange={this.handleChange} />
                <label htmlFor="password">Confirm password</label>
                {errors.ConfirmPassword &&
                   <span className="error-block">{errors.confirmPassword}</span>}
              </div>
            </div>
            <button className='login-button' type='submit' name="action">
              Sign up
            </button><br/><br/>
          </form>
        </div>
      </div>
    );
  }
}
SignUp.propTypes = {
  history: PropTypes.object.isRequired,
  signup: PropTypes.func.isRequired,
  error: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  error: state.usersReducer
});
const mapDispatchToProps = dispatch => ({
  signup: signupCredentials => dispatch(signupAction(signupCredentials))
});

export default connect(mapStateToProps,
  mapDispatchToProps)(withRouter(SignUp));
