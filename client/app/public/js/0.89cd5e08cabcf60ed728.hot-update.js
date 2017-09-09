webpackHotUpdate(0,{

/***/ 110:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(69);

var _propTypes = __webpack_require__(19);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _WelcomeMessage = __webpack_require__(274);

var _WelcomeMessage2 = _interopRequireDefault(_WelcomeMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Navigation = function (_React$Component) {
  _inherits(Navigation, _React$Component);

  function Navigation() {
    _classCallCheck(this, Navigation);

    return _possibleConstructorReturn(this, (Navigation.__proto__ || Object.getPrototypeOf(Navigation)).apply(this, arguments));
  }

  _createClass(Navigation, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      $(document).ready(function () {
        $(_this2.refs.buttonCollapse).sideNav();
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'nav',
          { className: 'custom-nav-wrapper' },
          _react2.default.createElement(
            'div',
            { className: 'nav-wrapper' },
            _react2.default.createElement(
              _reactRouterDom.Link,
              { to: '/', className: 'brand-logo custom-logo-wrap' },
              'HelloBooks'
            ),
            _react2.default.createElement(
              _reactRouterDom.Link,
              {
                to: '/',
                'data-activates': 'mobile-demo',
                className: 'button-collapse',
                ref: 'buttonCollapse'
              },
              _react2.default.createElement(
                'i',
                { className: 'material-icons' },
                'menu'
              )
            ),
            _react2.default.createElement(
              'ul',
              {
                id: 'nav-mobile',
                className: 'right hide-on-med-and-down custom-nav-list'
              },
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                  _reactRouterDom.Link,
                  { to: '' },
                  this.props.about
                )
              ),
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                  _reactRouterDom.Link,
                  { to: '' },
                  this.props.contact
                )
              ),
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                  _reactRouterDom.Link,
                  { to: this.props.whereTo },
                  this.props.sign
                )
              )
            ),
            _react2.default.createElement(
              'ul',
              {
                id: 'mobile-demo',
                className: 'side-nav'
              },
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                  _reactRouterDom.Link,
                  { to: '' },
                  this.props.about
                )
              ),
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                  _reactRouterDom.Link,
                  { to: '' },
                  this.props.contact
                )
              ),
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                  _reactRouterDom.Link,
                  { to: '' },
                  this.props.sign
                )
              )
            )
          )
        )
      );
    }
  }]);

  return Navigation;
}(_react2.default.Component);
// Navigation.PropTypes = {
//   about: PropTypes.string.isRequired,
//   contact: PropTypes.string.isRequired,
//   signin: PropTypes.string.isRequired
// }


exports.default = Navigation;

/***/ })

})