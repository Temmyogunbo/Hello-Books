import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SignUpForm from '../Forms/SignUpForm';
import { signupAction } from '../../actions/userActions';

const propTypes = {
  history: PropTypes.object.isRequired,
  signup: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};
/**
 *
 *@returns {object} jsx
 * @class SignupPage
 * @extends {React.Component}
 */
export class SignUpPage extends React.Component {
  /**
   * @returns {void}
   *
   * @memberof SignUpPage
   */
  componentWillMount() {
    if (this.props.isAuthenticated) {
      window.location = '/collections';
    }
  }
  /**
   * @returns {undefined}
   *
   * @param {any} nextProps
   * @memberof SignUpPage
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuthenticated) {
      this.props.history.replace('/collections');
    }
  }
  /**
* @description Renders content to the screen
 * @return {void}
 */
  render() {
    const {
      isAuthenticated,
      signup
    } = this.props;
    return (
      <div>
        <div className="image"/>
        <div className="row">
          <SignUpForm
            isAuthenticated={isAuthenticated}
            signup={signup}
          />
        </div>

      </div>
    );
  }
}
SignUpPage.propTypes = propTypes;
const mapStateToProps = (state) => ({
  isAuthenticated: state.userReducer.isAuthenticated
});
const mapDispatchToProps = dispatch => ({
  signup: signupCredentials => dispatch(signupAction(signupCredentials)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpPage);
