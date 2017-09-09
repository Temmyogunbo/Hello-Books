webpackHotUpdate(0,{

/***/ 691:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = signUpValidation;

var _validator = __webpack_require__(692);

var _validator2 = _interopRequireDefault(_validator);

var _isEmpty = __webpack_require__(265);

var _isEmpty2 = _interopRequireDefault(_isEmpty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description Validates Sign Up form data
 * @param  {object} formData
 * @return {object}
 */
function signUpValidation(formData) {
  var errors = {};
  console.log('mmmmmmm', formData, formData.fullName);
  if (_validator2.default.isEmpty(formData.fullName)) {
    errors.fullName = 'Full Name is Required';
  }
  if (_validator2.default.isEmpty(formData.userName)) {
    errors.userName = 'User Name is Required';
  }
  if (_validator2.default.isEmpty(formData.email)) {
    errors.email = 'Email is Required';
  }
  if (!_validator2.default.isEmail(formData.email)) {
    errors.email = 'Email is invalid';
  }
  if (_validator2.default.isEmpty(formData.password)) {
    errors.password = 'Password is Required';
  }
  if (_validator2.default.isEmpty(formData.Confirmpassword)) {
    errors.ConfirmPassword = 'Password Confirmation is Required';
  }
  if (!_validator2.default.equals(formData.password, formData.Confirmpassword)) {
    errors.passwordConfirm = 'Passwords must match';
  }
  if (!_validator2.default.isLength(formData.password, { min: 5, max: 100 })) {
    errors.password = 'Password must be minimum of 6 characters';
  }
  return {
    errors: errors,
    isValid: (0, _isEmpty2.default)(errors)
  };
}

/***/ })

})