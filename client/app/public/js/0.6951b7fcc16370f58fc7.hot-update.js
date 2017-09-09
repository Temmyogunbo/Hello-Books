webpackHotUpdate(0,{

/***/ 622:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = __webpack_require__(208);

var _reduxThunk = __webpack_require__(623);

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _userReducer = __webpack_require__(624);

var _userReducer2 = _interopRequireDefault(_userReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { composeWithDevTools } from 'redux-devtools-extension';
var rootReducer = combineReducers({ usersReducer: _userReducer2.default });
var store = (0, _redux.createStore)(rootReducer, (0, _redux.compose)((0, _redux.applyMiddleware)(_reduxThunk2.default), window.devToolsExtension ? window.devToolsExtension() : function (f) {
  return f;
}));

exports.default = store;

/***/ })

})