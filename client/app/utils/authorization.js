import axios from 'axios';


/**It attaches token to header request
 *
 *@returns {undefined}
 * @param {any} token
 */
function setAuthToken(token) {
  if (token) {
    axios.defaults.headers.common.authorization = token;
  } else {
    delete axios.defaults.headers.common.authorizaton;
  }
}
export default setAuthToken;
