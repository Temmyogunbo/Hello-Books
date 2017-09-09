webpackHotUpdate(0,{

/***/ 269:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(15);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(284);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = __webpack_require__(76);

var _history = __webpack_require__(202);

var _jwtDecode = __webpack_require__(205);

var _jwtDecode2 = _interopRequireDefault(_jwtDecode);

var _reactRedux = __webpack_require__(133);

__webpack_require__(419);

var _Signup = __webpack_require__(621);

var _Signup2 = _interopRequireDefault(_Signup);

var _store = __webpack_require__(622);

var _store2 = _interopRequireDefault(_store);

var _authorization = __webpack_require__(259);

var _authorization2 = _interopRequireDefault(_authorization);

var _userActions = __webpack_require__(163);

var _Navigation = __webpack_require__(108);

var _Navigation2 = _interopRequireDefault(_Navigation);

var _WelcomeMessage = __webpack_require__(267);

var _WelcomeMessage2 = _interopRequireDefault(_WelcomeMessage);

var _SignIn = __webpack_require__(669);

var _SignIn2 = _interopRequireDefault(_SignIn);

var _SignUp = __webpack_require__(671);

var _SignUp2 = _interopRequireDefault(_SignUp);

var _DashboardPage = __webpack_require__(682);

var _DashboardPage2 = _interopRequireDefault(_DashboardPage);

__webpack_require__(672);

__webpack_require__(673);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var history = (0, _history.createBrowserHistory)();

if (localStorage.jwtToken) {
  _authorization2.default.setAuthToken(localStorage.jwtToken);
  _store2.default.dispatch((0, _userActions.setAuthUser)((0, _jwtDecode2.default)(localStorage.jwtToken)));
}

_reactDom2.default.render(_react2.default.createElement(
  _reactRedux.Provider,
  { store: _store2.default },
  _react2.default.createElement(
    _reactRouterDom.BrowserRouter,
    { history: history },
    _react2.default.createElement(
      _reactRouterDom.Switch,
      null,
      _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/', component: _WelcomeMessage2.default }),
      _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/signin', component: _SignIn2.default }),
      _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/signup', component: _SignUp2.default }),
      _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/dashboard', component: _DashboardPage2.default })
    )
  )
), document.getElementById('app'));

/***/ })

})