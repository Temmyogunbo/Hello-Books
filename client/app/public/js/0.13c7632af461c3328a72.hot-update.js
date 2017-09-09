webpackHotUpdate(0,{

/***/ 674:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(15);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(68);

var _reactRedux = __webpack_require__(130);

var _toastr = __webpack_require__(269);

var _toastr2 = _interopRequireDefault(_toastr);

var _propTypes = __webpack_require__(18);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Navigation = __webpack_require__(108);

var _Navigation2 = _interopRequireDefault(_Navigation);

var _userActions = __webpack_require__(165);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 *
 *
 * @class SignupPage
 * @extends {React.Component}
 */

var SignUp = function (_React$Component) {
  _inherits(SignUp, _React$Component);

  function SignUp(props) {
    _classCallCheck(this, SignUp);

    var _this = _possibleConstructorReturn(this, (SignUp.__proto__ || Object.getPrototypeOf(SignUp)).call(this, props));

    _this.state = {
      fullName: '',
      userName: '',
      password: '',
      email: '',
      confirmPassword: '',
      errors: {}
    };
    _this.handleChange = _this.handleChange.bind(_this);
    _this.onSubmit = _this.onSubmit.bind(_this);
    return _this;
  }
  /*
   * This function receives error messages as props from the
   * store if they are any
   * @param {object} nextProps - error object from store
   * @return {void} null
   * @memberof SignupPage
  */
  //componentWillReceiveProps(nextProps) {
  //this.setState({ errors: nextProps.error });
  // }


  _createClass(SignUp, [{
    key: 'handleChange',
    value: function handleChange(event) {
      this.setState(_defineProperty({}, event.target.name, event.target.value));
    }

    /**
     *
     * @return {void} - dispatches the action
     * @param {void} event - null
     * @memberof SignupPage
     */

  }, {
    key: 'onSubmit',
    value: function onSubmit(event) {
      var _this2 = this;

      this.setState({ errors: {} });
      event.preventDefault();
      var _state = this.state,
          fullName = _state.fullName,
          userName = _state.userName,
          email = _state.email,
          password = _state.password;

      console.log('uuuuuu', this.props.error);
      this.props.signup({ fullName: fullName, userName: userName, email: email, password: password }).then(function (error) {
        _this2.setState({ errors: error.response.data });
        if (error) {
          _this2.props.history.push('/signup');
          _toastr2.default.error(error.response.data.message);
        } else {
          _this2.props.history.replace('/');
          _toastr2.default.success('You have successfully signed up');
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var errors = this.state.errors;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_Navigation2.default, { about: 'About us', contact: 'Contact us', sign: 'Log in' }),
        _react2.default.createElement(
          'h4',
          { className: 'sign-up-title' },
          'Sign up to HelloBooks:'
        ),
        _react2.default.createElement(
          'div',
          { className: 'row div-container-signup-form' },
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
                  'Full Name'
                ),
                _react2.default.createElement('input', { name: 'fullName', id: 'first_name', type: 'text',
                  className: 'validate', value: this.state.name,
                  onChange: this.handleChange })
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                'div',
                { className: 'input-field col.s5' },
                _react2.default.createElement(
                  'label',
                  { htmlFor: 'first_name' },
                  'Username'
                ),
                _react2.default.createElement('input', { name: 'userName', id: 'user_name', type: 'text',
                  className: 'validate', value: this.state.name,
                  onChange: this.handleChange })
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                'div',
                { className: 'input-field col.s5' },
                _react2.default.createElement(
                  'label',
                  { htmlFor: 'email' },
                  'Email'
                ),
                _react2.default.createElement('input', { name: 'email', id: 'email', type: 'email',
                  className: 'validate', value: this.state.name,
                  onChange: this.handleChange })
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                'div',
                { className: 'input-field col.s5' },
                _react2.default.createElement('input', { name: 'password', type: 'password', className: 'validate',
                  value: this.state.name, id: 'password',
                  onChange: this.handleChange }),
                _react2.default.createElement(
                  'label',
                  { htmlFor: 'password' },
                  'Password'
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                'div',
                { className: 'input-field col.s5' },
                _react2.default.createElement('input', { name: 'confirmPassword', type: 'password',
                  className: 'validate', value: this.state.name,
                  id: 'confirm_password', onChange: this.handleChange }),
                _react2.default.createElement(
                  'label',
                  { htmlFor: 'password' },
                  'Confirm password'
                )
              )
            ),
            _react2.default.createElement(
              'button',
              { className: 'login-button', type: 'submit', name: 'action' },
              'Sign up'
            ),
            _react2.default.createElement('br', null),
            _react2.default.createElement('br', null)
          )
        )
      );
    }
  }]);

  return SignUp;
}(_react2.default.Component);

SignUp.propTypes = {
  history: _propTypes2.default.object.isRequired,
  signup: _propTypes2.default.func.isRequired
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    signup: function signup(signupCredentials) {
      return dispatch((0, _userActions.signupAction)(signupCredentials));
    }
  };
};

exports.default = (0, _reactRedux.connect)(null, mapDispatchToProps)((0, _reactRouterDom.withRouter)(SignUp));

/***/ })

})