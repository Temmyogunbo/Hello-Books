webpackHotUpdate(0,{

/***/ 147:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(82);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _jwtDecode = __webpack_require__(108);

var _jwtDecode2 = _interopRequireDefault(_jwtDecode);

var _redux = __webpack_require__(63);

var _reactRedux = __webpack_require__(64);

var _reactRouterDom = __webpack_require__(26);

var _reduxThunk = __webpack_require__(296);

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _authorization = __webpack_require__(128);

var _authorization2 = _interopRequireDefault(_authorization);

var _userActions = __webpack_require__(73);

var _rootReducer = __webpack_require__(315);

var _rootReducer2 = _interopRequireDefault(_rootReducer);

var _App = __webpack_require__(343);

var _App2 = _interopRequireDefault(_App);

__webpack_require__(349);

__webpack_require__(350);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import 'babel-polyfill';
var store = (0, _redux.createStore)(_rootReducer2.default, (0, _redux.compose)((0, _redux.applyMiddleware)(_reduxThunk2.default), window.devToolsExtension ? window.devToolsExtension() : function (f) {
  return f;
}));

if (localStorage.jwtToken) {
  _authorization2.default.setAuthToken(localStorage.jwtToken);
  store.dispatch((0, _userActions.setAuthUser)((0, _jwtDecode2.default)(localStorage.jwtToken)));
}

_reactDom2.default.render(_react2.default.createElement(
  _reactRedux.Provider,
  { store: store },
  _react2.default.createElement(
    _reactRouterDom.BrowserRouter,
    null,
    _react2.default.createElement(_App2.default, null)
  )
), document.getElementById('app'));

/***/ })

})