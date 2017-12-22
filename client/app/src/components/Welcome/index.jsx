import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


const propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

/**it contains method for welcome component
 *
 * @returns {object} jsx
 *
 * @class Welcome
 *
 * @extends {React.Component}
 */
export class Welcome extends React.Component {
  /**it checks if a user is authenticated and redirects
   *
   * @returns {undefined}
   *
   * @memberof SplashScreen
   */
  componentWillMount() {
    if (this.props.isAuthenticated) {
      window.location = '/collections';
    }
  }

  /**It returns a div element
   *
   *
   * @returns {object} jsx
   *
   * @memberof Welcome
   */
  render() {
    this.var = '';
    return (
      <div>
        <div className="image" />
        <div className="welcome-message-container">
          <div className="welcome-message-text">
            <h1 >Welcome to HelloBooks</h1>
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
Welcome.propTypes = propTypes;

/**
 * It slices the state and returns isAutheneticated boolean
 *
 * @param {object} state
 *
 * @returns {object} new state
*/
const mapStateToProps = (state) => ({
  isAuthenticated: state.userReducer.isAuthenticated
});
export default connect(mapStateToProps, null)(Welcome);
