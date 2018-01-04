import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/**
 * It checks if a component is signed in and
 * also determine if admin before rendering
 *
 * @param {object} ComposedComponent
 *
 * @returns {object} jsx
 */
export const CheckSignedContainer = (ComposedComponent) => {
  const propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired,
    role: PropTypes.string.isRequired,
  };

  /**
 * This class checks if a user is alresdy authenticated
 *
 * @class CheckSignedInContainer
 *
 * @extends {React.Component}
 */
  class CheckSignedInContainer extends React.Component {
    /**
     * Creates an instance of CheckSignedInContainer.
     *
     * @param {object} props - contains react props
     *
     * @memberof CheckSignedInContainer
     */
    constructor(props) {
      super(props);
      this.state = {
        isAdmin: false,
      };
    }
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
      } else if (this.props.role === 'admin') {
        this.setState({ isAdmin: true, });
      }
    }
    /**It removes background image
     *
  * @returns {undefined}
  *
  * @memberof CheckSignedInContainer
  */
    componentDidMount() {
      document.getElementsByTagName('body')[0].classList.remove('image');
      this.var = '';
    }
    /**It checks if user is authenticated before updating
     *
 * @returns {undefined}
 *
 * @param {object} nextProps
 *
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
 *
 * @memberof CheckSignedInContainer
 */
    render() {
      return (
        <ComposedComponent {...this.props} isAdmin={this.state.isAdmin} />
      );
    }
  }
  CheckSignedInContainer.propTypes = propTypes;

  /**It slices the state and return authenticate
   *
   *
   * @param {object} state - application state
   *
   * @returns {object} user
   */
  const mapStateToProps = (state) => ({
    isAuthenticated: state.userReducer.isAuthenticated,
    role: state.userReducer.user.role,
  });

  return connect(mapStateToProps)(CheckSignedInContainer);
};
export default CheckSignedContainer;
