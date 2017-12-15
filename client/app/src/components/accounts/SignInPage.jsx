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
 * Class component for signin page
 *
 * @export
 * @class SignInPage
 * @extends {React.Component}
 */
export class SignInPage extends React.Component {
/**
 * It checks if a user is authenticated
 * and redirects to the collections page
 *
 * @memberof SignInPage
 * @returns {undefined}
 */
  componentWillMount() {
    if (this.props.isAuthenticated) {
      window.location = '/collections';
    }
  }
  /**
 * It checks if a user is authenticted
 * if the props should change
 *
 * @param {any} nextProps
 *
 * @memberof SignInPage
 *
 * @returns {undefined}
 */
  componentWillReceiveProps(nextProps) {
    if (nextProps.isAuthenticated) {
      this.props.history.replace('/collections');
    }
  }

  /**
 * It returns a div element
 * that will be attached to the DOM
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
/**
 * It slices the state and returned isAuthenticated boolean
 *
 * @param {object} state
 *
 * @returns {object} new state
*/
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
