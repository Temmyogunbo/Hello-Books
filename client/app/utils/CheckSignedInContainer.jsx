import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

export default (ComposedComponent) => {
  class CheckSignedInContainer extends React.Component {
    componentDidlMount() {
      if (!this.props.isAuthenticated) {
        toastr.error('You need to sign in');
        this.props.history.replace('/signin');
      }
    }
    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.props.history.replace('/signin');
      }
    }
    render() {
      const { match, dispatch, location, staticContext, rest } = this.props;
      return (
        <ComposedComponent {...rest} />
      );
    }
  }
  CheckSignedInContainer.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired
  };
  const mapStateToProps = (state) => {
    return {
      isAuthenticated: state.userReducer.isAuthenticated
    };
  };
  return connect(mapStateToProps)(CheckSignedInContainer);
};
