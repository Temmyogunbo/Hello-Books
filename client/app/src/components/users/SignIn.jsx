import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import Navigation from './Navigation.jsx';
import { signinAction } from '../../actions/userActions';
import signInValidation from '../../../../../server/helper/signinValidation';


class SignInPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      userId: '',
      errors: {},
      isLoading: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
  **@description Checks that form is valid
  * @return {Boolean}
	*/
  validateForm() {
    const { errors, isValid } = signInValidation(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }
  /**
   *
   * @return {void} the login action is dispatched
   * @param {void} event - on click event
   * @memberof LoginPage
   */
  onSubmit(event) {
    event.preventDefault();
    if (this.validateForm()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.signin(this.state).then((error) => {
        if (!error) {
          if (this.props.user.roleId === 1) {
            this.props.history.replace('/admindashboard');
            toastr.success('You are Logged in successfully');
            return;
          }
          this.props.history.replace('/dashboard');
          toastr.success('You are Logged in successfully');
        } else {
          this.setState({ errors: error.data.message, isLoading: false });
          toastr.error(error.data.message);
        }
      });
    }
  }
  render() {
    const { errors, isLoading } = this.state;
    return (
      <div className="image">
        <Navigation about="About us" contact="Contact us" sign="Sign up" whereTo="/signup" />
        <h3 className="log-in-title">Log in:</h3>
        <div className="row div-container-form">
          <form className="col.s12" onSubmit={this.onSubmit}>
            <div className="row">
              <div className="input-field col.s5">
                <label htmlFor="first_name">
                  <i className="material-icons">person</i> Username
                </label>
                <input
                  name="userName" id="first_name" type="text"
                  className="validate" value={this.state.name}
                  onChange={this.handleChange} />
                <span className="error-block">
                  {errors.userName}
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
                <label htmlFor="password">
                  <i className="material-icons">lock</i> Password</label>
              </div>
            </div>
            <button
              className="login-button" type="submit"
              data-action="log-in-form"
              disabled={isLoading}>
              Log in
            </button><br /><br />
            <a href=''>Did you forget your password?</a>
          </form>
        </div>
      </div>
    );
  }
}
SignInPage.propTypes = {
  history: PropTypes.object.isRequired,
  signin: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.userReducer.user
  };
}

const mapDispatchToProps = dispatch => ({
  signin: signinCredentials => dispatch(
    signinAction(signinCredentials)
  )
});

export default connect(mapStateToProps,
  mapDispatchToProps)(
  withRouter(SignInPage)
);
