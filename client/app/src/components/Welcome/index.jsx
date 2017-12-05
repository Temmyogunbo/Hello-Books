import React from 'react';
import { connect } from 'react-redux';
/**
 * @returns {object} jsx
 *
 * @class SplashScreen
 * @extends {React.Component}
 */
class SplashScreen extends React.Component {
  /**
   * @returns {undefined}
   *
   * @memberof SplashScreen
   */
  componentWillMount() {
    if (this.props.isAuthenticated) {
      window.location = '/collections';
    }
  }

  /**
   *
   *
   * @returns {object} jsx
   * @memberof SplashScreen
   */
  render() {
    this.var = '';
    return (
      <div>
        <div className="image" />
        <div className="row welcome-message-container">
          <div className="col s6 push-s3">
            <h1>Welcome to HelloBooks</h1>
            <p className="welcome-message">
                Your platform to up to date books.<br />
                You can borrow, and read <br />
                books online.
            </p>
          </div>
        </div>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.userReducer.isAuthenticated
});
export default connect(mapStateToProps, null)(SplashScreen);
