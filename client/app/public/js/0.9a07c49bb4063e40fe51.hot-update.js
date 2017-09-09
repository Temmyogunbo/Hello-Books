webpackHotUpdate(0,{

/***/ 316:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _isEmpty = __webpack_require__(317);

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _actionTypes = __webpack_require__(135);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = {
  isAuthenticated: false,
  user: {},
  error: {}
};

/**
 *
 *
 * @param {object} [action={}] - object payload from the actions
 * @returns {object} - returns users in an object
*/

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case _actionTypes.SET_AUTH_USERS:
      return _extends({}, state, {
        user: action.user,
        isAuthenticated: !(0, _isEmpty2.default)(action.user),
        error: {}
      });
    case _actionTypes.SET_AUTH_USERS_ERROR:
      return _extends({}, state, {
        error: action.error
      });
    default:
      return state;
  }
};

/***/ })

})