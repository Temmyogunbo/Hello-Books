import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  signinAction,
  signupAction,
} from '../../actions/userActions';

const propTypes = {
  history: PropTypes.object.isRequired,
  signin: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  render: PropTypes.func.isRequired,
};
/**
 * class component for Authentication
 *
 * @class Authentication
 *
 * @extends {React.Component}
 */
export class Authentication extends React.Component {
  /**It checks if the user is authenticated and redirects to collections page
 *
 *
 * @memberof Authentication
 *
 * @returns {undefined}
 */
  componentWillMount() {
    if (this.props.isAuthenticated) {
      window.location = '/collections';
    }
  }
  /**
     * It checks if a user is still authenticated on
     *  receiving nex tprops and redirects to the collections
     *
     * @returns {undefined}
     *
     * @param {object} nextProps
     *
     * @memberof Authentication
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
    return (
      <div>
        <div className="image" />
        { this.props.render(this.props) }

      </div>
    );
  }
}
Authentication.propTypes = propTypes;
/**
 * It slices the state and returned isAuthenticated boolean
 *
 * @param {object} state
 * @param {object} ownProps
 *
 * @returns {object} new state
*/
const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  isAuthenticated: state.userReducer.isAuthenticated,
});

export default connect(
  mapStateToProps,
  {
    signin: signinAction,
    signup: signupAction,
  }
)(Authentication);
