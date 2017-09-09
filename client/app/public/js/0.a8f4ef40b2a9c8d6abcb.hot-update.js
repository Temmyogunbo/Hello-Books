webpackHotUpdate(0,{

/***/ 343:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(82);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = __webpack_require__(26);

var _history = __webpack_require__(126);

var _Navigation = __webpack_require__(44);

var _Navigation2 = _interopRequireDefault(_Navigation);

var _WelcomeMessage = __webpack_require__(145);

var _WelcomeMessage2 = _interopRequireDefault(_WelcomeMessage);

var _SignIn = __webpack_require__(345);

var _SignIn2 = _interopRequireDefault(_SignIn);

var _SignUp = __webpack_require__(347);

var _SignUp2 = _interopRequireDefault(_SignUp);

__webpack_require__(349);

__webpack_require__(350);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import DashboardPage from './users/DashboardPage.jsx';
var history = (0, _history.createBrowserHistory)();

var App = function App() {
  return _react2.default.createElement(
    _reactRouterDom.BrowserRouter,
    { history: history },
    _react2.default.createElement(
      _reactRouterDom.Switch,
      null,
      _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/', component: _WelcomeMessage2.default }),
      _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/signin', component: _SignIn2.default }),
      _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/signup', component: _SignUp2.default })
    )
  );
};

exports.default = App;

/***/ }),

/***/ 344:
false

})