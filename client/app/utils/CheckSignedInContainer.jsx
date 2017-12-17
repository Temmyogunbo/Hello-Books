import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export default (ComposedComponent) => {
  const propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired
  };

  /**
 * This class checks if a user is alresdy authenticated
 *
 * @class CheckSignedInContainer
 * @extends {React.Component}
 */
  class CheckSignedInContainer extends React.Component {
    /**It checks if user is authenticated
 * before mounting componet
 *
 * @returns {undefined}
 *
 * @memberof CheckSignedInContainer
 */
    componentWillMount() {
      if (!this.props.isAuthenticated) {
        window.location = '/signin';
      }
    }
    /**It removes background image
  * @returns {undefined}
  *
  * @memberof CheckSignedInContainer
  */
    componentDidMount() {
      document.getElementsByTagName('body')[0].classList.remove('image');
      this.var = '';
    }
    /**It checks if user is authenticated before updating
 * @returns {undefined}
 *
 * @param {any} nextProps
 * @memberof CheckSignedInContainer
 */
    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.props.history.replace('/signin');
      }
    }
    /**
 * It returns a jsx object
 *
 * @returns {object} jsx
 * @memberof CheckSignedInContainer
 */
    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }
  CheckSignedInContainer.propTypes = propTypes;
  /**It slices the state and return authenticate
   *
   *
   * @param {any} state
   * @returns {object} user
   */
  const mapStateToProps = (state) => ({
    isAuthenticated: state.userReducer.isAuthenticated
  });

  return connect(mapStateToProps)(CheckSignedInContainer);
};
