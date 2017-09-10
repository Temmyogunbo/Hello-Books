import axios from 'axios';

class Authorization {
  static setAuthToken(token) {
    if (token) {
      axios.defaults.headers.common.authorization = token;
    } else {
      delete axios.defaults.headers.common.authorizaton;
    }
  };
}
export default Authorization;
