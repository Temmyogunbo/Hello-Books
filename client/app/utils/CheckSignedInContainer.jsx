import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from 'toastr';

export default (ComposedComponent) => {
  const propTypes = {
    user: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };
  /**
   * 
   * 
   * @class CheckSignedInContainer
   * @extends {React.Component}
   */
  class CheckSignedInContainer extends React.Component {
    /**
     * @returns {void}
     * 
     * @memberof CheckSignedInContainer
     */
    componentDidMount() {
      document.getElementsByTagName('body')[0].classList.remove('image');
      if (!this.props.user.isAuthenticated) {
        toastr.error('You need to sign in');
        this.props.history.replace('/signin');
      }
    }
    /**
     * @returns {void}
     * 
     * @param {any} nextProps 
     * @memberof CheckSignedInContainer
     */
    componentWillUpdate(nextProps) {
      if (!nextProps.user.isAuthenticated) {
        this.props.history.replace('/signin');
      }
    }
    /**
     * 
     * 
     * @returns {object} jsx
     * @memberof CheckSignedInContainer
     */
    render() {
      const { match, dispatch, location, staticContext, rest } = this.props;
      return (
        <ComposedComponent {...rest} />
      );
    }
  }
  CheckSignedInContainer.propTypes = propTypes;
  /**
   * 
   * 
   * @param {any} state 
   * @returns {object} user  
   */
  const mapStateToProps = (state) => ({
    user: state.userReducer
  });

  return connect(mapStateToProps)(CheckSignedInContainer);
};
