import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { signinAction } from '../../actions/userActions';
import signInValidation from '../../../utils/signInValidation';

const propTypes = {
  history: PropTypes.object.isRequired,
  signin: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  success: PropTypes.object.isRequired
};
/**
 *
 *
 * @class SignInPage
 * @extends {React.Component}
 */
class SignInPage extends React.Component {
  /**
   * Creates an instance of SignInPage.
   * @param {any} props
   * @memberof SignInPage
   */
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

  /**
   * @param {any} nextProps
   * @memberof SignInPage
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuthenticated) {
      this.props.history.replace('/collections');
    }
    if (!isEmpty(nextProps.success)) {
      this.setState({ isLoading: false });
    }
  }

  /**
   *
   * @returns {void}
   * @param {any} event
   * @memberof SignInPage
   */
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
  **@description Checks that form is valid
  * @return {Boolean} boolen
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
      this.props.signin(this.state);
    }
  }

  /**
   *
   *
   * @returns {object} jsx
   * @memberof SignInPage
   */
  render() {
    const { errors, isLoading } = this.state;
    return (
      <div>
        <div className="image"/>
        <div className="row">
          <form
            className="col s6 push-s3 div-container-form"
            onSubmit={this.onSubmit}
          >
            <h3 className="sign-title">Log in:</h3>
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
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.userReducer.isAuthenticated,
  success: state.errorReducer.error
});

SignInPage.propTypes = propTypes;
export default connect(
  mapStateToProps,
  {
    signin: signinAction
  }
)(withRouter(SignInPage));
