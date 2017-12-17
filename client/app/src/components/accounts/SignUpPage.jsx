import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SignUpForm from '../forms/SignUpForm';
import { signupAction } from '../../actions/userActions';

const propTypes = {
  history: PropTypes.object.isRequired,
  signup: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};
/**
 * class component for signup page
 *
 * @export
 * @class SignUpPage
 * @extends {React.Component}
 */
export class SignUpPage extends React.Component {
  /**It checks if the user is authenticated and redirects to collections page
   *
   *
   * @memberof SignUpPage
   * @returns {undefined}
   */
  componentWillMount() {
    if (this.props.isAuthenticated) {
      window.location = '/collections';
    }
  }
  /**
   * It checks if a user is still authenticated on
   *  receiving nex tprops and redirects to the collectionbs page
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
  /**It returns a div element that will be attached to he DOM
   *
  * @return {object} jsx
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

/**
 * Itdispatches sign up action to the store
 *
 * @param {object} dispatch
 *
 * @returns {object} new state
*/
const mapDispatchToProps = dispatch => ({
  signup: signupCredentials => dispatch(signupAction(signupCredentials)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpPage);
