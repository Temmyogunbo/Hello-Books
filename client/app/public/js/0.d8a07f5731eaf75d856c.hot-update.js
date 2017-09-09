webpackHotUpdate(0,{

/***/ 267:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(15);

var _react2 = _interopRequireDefault(_react);

var _Navigation = __webpack_require__(108);

var _Navigation2 = _interopRequireDefault(_Navigation);

var _reactRouterDom = __webpack_require__(76);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WelcomeMessage = function WelcomeMessage() {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_Navigation2.default, { about: 'About us', contact: 'Contact us', sign: 'Log in' }),
    _react2.default.createElement(
      'div',
      { className: 'welcome-message-container' },
      _react2.default.createElement(
        'h1',
        null,
        'Welcome to HelloBooks'
      ),
      _react2.default.createElement(
        'p',
        { className: 'welcome-message' },
        'Your platform to up to date books.',
        _react2.default.createElement('br', null),
        'You can borrow, and read ',
        _react2.default.createElement('br', null),
        'books online.'
      ),
      _react2.default.createElement(
        'div',
        { className: 'welcome-container-div-button' },
        _react2.default.createElement(
          'button',
          { className: 'welcome-container-button', 'data-action': 'sign-up-form' },
          _react2.default.createElement(
            _reactRouterDom.Link,
            { to: '/signin' },
            ' Sign up'
          )
        ),
        _react2.default.createElement(
          _reactRouterDom.Link,
          { to: '/signup' },
          _react2.default.createElement(
            'button',
            { className: 'welcome-container-button' },
            _react2.default.createElement(
              'p',
              null,
              'sign up with'
            ),
            _react2.default.createElement(
              _reactRouterDom.Link,
              { to: '/signup' },
              _react2.default.createElement('img', { width: '30', height: '30', src: 'https://lh3.googleusercontent.com/N-AY2XwXafWq4TQWfua6VyjPVQvTGRdz9CKOHaBl2nu2GVg7zxS886X5giZ9yY2qIjPh=w300' })
            )
          )
        )
      )
    )
  );
};
exports.default = WelcomeMessage;

/***/ })

})