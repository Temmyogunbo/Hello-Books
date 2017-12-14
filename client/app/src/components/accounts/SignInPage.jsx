import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SignInForm } from '../forms/SignInForm';
import { signinAction } from '../../actions/userActions';

const propTypes = {
  history: PropTypes.object.isRequired,
  signin: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};
/**
 *
 *
 * @class SignInPage
 * @extends {React.Component}
 */
export class SignInPage extends React.Component {
  /**
   * @returns {void}
   *
   * @memberof SignInPage
   */
  componentWillMount() {
    if (this.props.isAuthenticated) {
      window.location = '/collections';
    }
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
  }

  /**
   *
   *
   * @returns {object} jsx
   * @memberof SignInPage
   */
  render() {
    const {
      isAuthenticated,
      signin
    } = this.props;
    return (
      <div>
        <div className="image"/>
        <div className="row">
          <SignInForm
            isAuthenticated={isAuthenticated}
            signin={signin}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.userReducer.isAuthenticated
});

SignInPage.propTypes = propTypes;
export default connect(
  mapStateToProps,
  {
    signin: signinAction
  }
)(SignInPage);
