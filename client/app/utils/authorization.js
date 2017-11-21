import axios from 'axios';
/**
 * @returns {objecct} instance of Authorization
 *
 * @class Authorization
 */
class Authorization {
  /**
   * @returns {void}
   *
   * @static
   * @param {any} token
   * @memberof Authorization
   */
  static setAuthToken(token) {
    if (token) {
      axios.defaults.headers.common.authorization = token;
    } else {
      delete axios.defaults.headers.common.authorizaton;
    }
  }
}
export default Authorization;
