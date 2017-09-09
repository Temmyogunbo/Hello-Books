webpackHotUpdate(0,{

/***/ 128:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = __webpack_require__(129);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Authorization = function () {
  function Authorization() {
    _classCallCheck(this, Authorization);
  }

  _createClass(Authorization, null, [{
    key: 'setAuthToken',
    value: function setAuthToken(token) {
      if (token) {
        console.log('...............', token);
        _axios2.default.defaults.headers.common.authorization = token;
      } else {
        delete _axios2.default.defaults.headers.common.authorizaton;
      }
    }
  }]);

  return Authorization;
}();

exports.default = Authorization;

/***/ })

})