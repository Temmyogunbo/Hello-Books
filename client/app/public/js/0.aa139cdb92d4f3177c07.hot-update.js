webpackHotUpdate(0,{

/***/ 689:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(69);

var _reactRedux = __webpack_require__(132);

var _toastr = __webpack_require__(275);

var _toastr2 = _interopRequireDefault(_toastr);

var _propTypes = __webpack_require__(19);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Navigation = __webpack_require__(110);

var _Navigation2 = _interopRequireDefault(_Navigation);

var _userActions = __webpack_require__(167);

var _signinValidation = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../../../../server/helper/signinValidation\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

var _signinValidation2 = _interopRequireDefault(_signinValidation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SignInPage = function (_React$Component) {
  _inherits(SignInPage, _React$Component);

  function SignInPage(props) {
    _classCallCheck(this, SignInPage);

    var _this = _possibleConstructorReturn(this, (SignInPage.__proto__ || Object.getPrototypeOf(SignInPage)).call(this, props));

    _this.state = {
      userName: '',
      password: '',
      userId: '',
      errors: {},
      isLoading: false
    };
    _this.handleChange = _this.handleChange.bind(_this);
    _this.onSubmit = _this.onSubmit.bind(_this);
    return _this;
  }

  _createClass(SignInPage, [{
    key: 'handleChange',
    value: function handleChange(event) {
      this.setState(_defineProperty({}, event.target.name, event.target.value));
    }
    /**
    **@description Checks that form is valid
    * @return {Boolean}
    */

  }, {
    key: 'validateForm',
    value: function validateForm() {
      var _signInValidation = (0, _signinValidation2.default)(this.state),
          errors = _signInValidation.errors,
          isValid = _signInValidation.isValid;

      if (!isValid) {
        this.setState({ errors: errors });
      }
      return isValid;
    }
    /**
     *
     * @return {void} the login action is dispatched
     * @param {void} event - on click event
     * @memberof LoginPage
     */

  }, {
    key: 'onSubmit',
    value: function onSubmit(event) {
      var _this2 = this;

      if (this.validateForm()) {
        event.preventDefault();
        this.setState({ errors: {} });
        this.props.signin(this.state).then(function (error) {
          if (!error) {
            _this2.props.history.replace('/');
            _toastr2.default.success('You are Logged in successfully');
          } else {
            _this2.props.history.push('/');
            _this2.setState({ errors: error.data.message });
            if (error.data.message) {
              _toastr2.default.error(error.data.message);
            }
          }
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var errors = this.state.errors;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_Navigation2.default, { about: 'About us', contact: 'Contact us', sign: 'Sign up', whereTo: '/signup' }),
        _react2.default.createElement(
          'h3',
          { className: 'log-in-title' },
          'Log in:'
        ),
        _react2.default.createElement(
          'div',
          { className: 'row div-container-form' },
          _react2.default.createElement(
            'form',
            { className: 'col.s12', onSubmit: this.onSubmit },
            _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                'div',
                { className: 'input-field col.s5' },
                _react2.default.createElement(
                  'label',
                  { htmlFor: 'first_name' },
                  _react2.default.createElement(
                    'i',
                    { className: 'material-icons' },
                    'person'
                  ),
                  ' Username'
                ),
                _react2.default.createElement('input', {
                  name: 'userName', id: 'first_name', type: 'text',
                  className: 'validate', value: this.state.name,
                  onChange: this.handleChange }),
                _react2.default.createElement(
                  'span',
                  { className: 'error-block' },
                  errors.userName
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                'div',
                { className: 'input-field col.s5' },
                _react2.default.createElement('input', {
                  name: 'password', type: 'password', className: 'validate',
                  value: this.state.name, id: 'password',
                  onChange: this.handleChange }),
                _react2.default.createElement(
                  'span',
                  { className: 'error-block' },
                  errors.password
                ),
                _react2.default.createElement(
                  'label',
                  { htmlFor: 'password' },
                  _react2.default.createElement(
                    'i',
                    { className: 'material-icons' },
                    'lock'
                  ),
                  ' Password'
                )
              )
            ),
            _react2.default.createElement(
              'button',
              {
                className: 'login-button', type: 'submit',
                'data-action': 'log-in-form' },
              'Log in'
            ),
            _react2.default.createElement('br', null),
            _react2.default.createElement('br', null),
            _react2.default.createElement(
              'a',
              { href: '' },
              'Did you forget your password?'
            )
          )
        )
      );
    }
  }]);

  return SignInPage;
}(_react2.default.Component);

SignInPage.propTypes = {
  history: _propTypes2.default.object.isRequired,
  signin: _propTypes2.default.func.isRequired
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    signin: function signin(signinCredentials) {
      return dispatch((0, _userActions.signinAction)(signinCredentials));
    }
  };
};

exports.default = (0, _reactRedux.connect)(null, mapDispatchToProps)((0, _reactRouterDom.withRouter)(SignInPage));

/***/ })

})