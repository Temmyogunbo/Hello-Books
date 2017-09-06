import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import Navigation from './Navigation.jsx';
import signinAction from '../../actions/userActions';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      userId: '',
      errors: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
   *
   * @return {void} the login action is dispatched
   * @param {void} event - on click event
   * @memberof LoginPage
   */
  onSubmit(event) {
    event.preventDefault();
    this.setState({ errors: { } });
    this.props.signin(this.state).then((error) => {
    	console.log('I am not here', error)
      if (!error) {
        this.props.history.push('/');
        toastr.success('You are Logged in successfully');
      } else {
        this.props.history.push('/');
        this.setState({ errors: error.response.data });
        if (error.response.data.message) {
          toastr.error(this.state.errors.message);
        }
      }
    });
  }
  render() {
    const { errors } = this.state;
    return (
      <div>
        <Navigation about='About us' contact='Contact us' signup='Sign up' />
        <div className="row div-container-form">
          <form className="col.s12" onSubmit={this.onSubmit}>
            <div className="row">
              <div className="input-field col.s5">
                <label htmlFor="first_name"><i className="material-icons">person</i> Username</label>
                 {errors.userName &&
                   <span className="error-block">{errors.userName}</span>}
                <input name='userName' id="first_name" type="text" className="validate" value={this.state.name} onChange = {this.handleChange} />
              </div>
            </div>
            <div className="row">
              <div className="input-field col.s5">
                <input name='password' type="password" className="validate"
                  value={this.state.name} id='password' onChange={this.handleChange}/>
                   {errors.password &&
                   <span className="error-block">{errors.password}</span>}
                <label htmlFor="password"><i className="material-icons">lock</i> Password</label>
              </div>
            </div>
            <button className='login-button' type='submit'
              data-action='log-in-form'>
              Log in
            </button><br/><br/>
            <a href=''>Did you forget your password?</a>
          </form>
        </div>
      </div>
    );
  }
}
SignIn.propTypes = {
  history: PropTypes.object.isRequired,
  signinAction: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.usersReducer
});

const mapDispatchToProps = dispatch => ({
  signin: signinCredentials => dispatch(signinAction.signinAction(signinCredentials))
});
export default connect(mapStateToProps,
  mapDispatchToProps)(
  withRouter(SignIn)
); 
