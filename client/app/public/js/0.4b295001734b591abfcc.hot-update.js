webpackHotUpdate(0,{

/***/ 73:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signinAction = exports.signupAction = undefined;

var _axios = __webpack_require__(129);

var _axios2 = _interopRequireDefault(_axios);

var _jwtDecode = __webpack_require__(108);

var _jwtDecode2 = _interopRequireDefault(_jwtDecode);

var _authorization = __webpack_require__(128);

var _authorization2 = _interopRequireDefault(_authorization);

var _actionTypes = __webpack_require__(135);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @return {object} - an object of created user
 * sends created user response as a payload to the reducer
 * @param {object} user - created user payload
 */
var setAuthUser = function setAuthUser(user) {
  return {
    type: _actionTypes.SET_AUTH_USERS,
    user: user
  };
};
/**
 *
 * @return {object} error
 * @param {error} error - dispatched error object
 */
var setAuthUserError = function setAuthUserError(error) {
  return {
    type: _actionTypes.SET_AUTH_USERS_ERROR,
    error: error
  };
};

/**
 * @return {object} - created user from the server side
 * sends an object of the created user and returns an auth token for the user
 * @param {object} userData - userdetails to be registered
 */
var signupAction = exports.signupAction = function signupAction(userData) {
  return function (dispatch) {
    return _axios2.default.post('/api/v1/users/signup', userData).then(function (response) {
      var token = response.data.token;
      localStorage.setItem('jwtToken', token);
      _authorization2.default.setAuthToken(token);
      dispatch(setAuthUser((0, _jwtDecode2.default)(token)));
    }).catch(function (error) {
      console.log('.....,,,,,,.....////');
      dispatch(setAuthUserError(error.response.data));
    });
  };
};

/**
 * @return {object} - returns an object of logged in user
 *sends the decoded user payload to the reducer
 * @param {object} user - logged in user payload
 */

/**
 *  @return {object} - array of users
 * sends the users details to be verified before proceeding
 * @param {object} user - logged in user payload
 */
var signinAction = exports.signinAction = function signinAction(user) {
  return function (dispatch) {
    return _axios2.default.post('/api/v1/users/signin', user).then(function (_ref) {
      var data = _ref.data;

      console.log(data);
      var token = data.token;
      localStorage.setItem('jwtToken', token);
      _authorization2.default.setAuthToken(token);
      dispatch(setAuthUser((0, _jwtDecode2.default)(token)));
    }).catch(function (_ref2) {
      var response = _ref2.response;

      console.log(response);
      dispatch(setAuthUserError(response.data.message));
      return response;
    });
  };
};

exports.default = {
  signupAction: signupAction,
  signinAction: signinAction
};

/***/ })

})