webpackHotUpdate(0,{

/***/ 784:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(6);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(11);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _sweetalert = __webpack_require__(179);

var _sweetalert2 = _interopRequireDefault(_sweetalert);

var _BookForm = __webpack_require__(785);

var _BookForm2 = _interopRequireDefault(_BookForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AdminBooks = function (_React$Component) {
  _inherits(AdminBooks, _React$Component);

  function AdminBooks(props) {
    _classCallCheck(this, AdminBooks);

    var _this = _possibleConstructorReturn(this, (AdminBooks.__proto__ || Object.getPrototypeOf(AdminBooks)).call(this, props));

    _this.state = {
      book: {},
      books: []
    };
    _this.onClickEditBook = _this.onClickEditBook.bind(_this);
    return _this;
  }

  _createClass(AdminBooks, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      $(document).ready(function () {
        $('#modal').modal();
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.books !== this.props.books) {
        this.setState({ books: nextProps.books });
      }
    }
  }, {
    key: 'onClickEditBook',
    value: function onClickEditBook(event) {
      event.preventDefault();
      var bookId = event.target.parentNode.id;
      var book = this.props.books.find(function (book) {
        return parseInt(book.id, 10) === parseInt(bookId, 10);
      });
      this.setState({
        book: book
      });
      $('#modal').modal('open');
      console.log(book);
    }
  }, {
    key: 'handleDelete',
    value: function handleDelete(book) {
      var _this2 = this;

      (0, _sweetalert2.default)({
        title: 'Delete this book?',
        text: "You won't be able to revert this!",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(function () {
        _this2.props.deleteBook(book.id).then(function () {
          if (_this2.props.deleteMessage.bookDeleted) {
            (0, _sweetalert2.default)(_this2.props.deleteMessage.deleteMessage.msg);
            return _this2.props.getAllBooks();
          }
          (0, _sweetalert2.default)(_this2.props.deleteMessage.error.msg);
        });
      }).catch(_sweetalert2.default.noop);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      console.log('coming from dashs', this.props.categories);
      var bookItems = void 0;
      if (this.state.books) {
        bookItems = this.state.books.map(function (book, index) {
          return _react2.default.createElement(
            'tr',
            { key: book.id },
            _react2.default.createElement(
              'th',
              null,
              index + 1
            ),
            _react2.default.createElement(
              'th',
              null,
              book.category
            ),
            _react2.default.createElement(
              'th',
              null,
              book.author
            ),
            _react2.default.createElement(
              'th',
              null,
              book.title
            ),
            _react2.default.createElement(
              'th',
              null,
              book.quantity
            ),
            _react2.default.createElement(
              'th',
              { id: book.id },
              _react2.default.createElement(
                'a',
                { className: 'waves-effect waves-light', onClick: _this3.onClickEditBook },
                '+'
              )
            ),
            _react2.default.createElement(
              'th',
              null,
              _react2.default.createElement(
                'a',
                { className: 'link-color', onClick: function onClick() {
                    _this3.handleDelete.bind(_this3)(book);
                  } },
                _react2.default.createElement('i', { className: 'fa fa-trash-o', 'aria-hidden': 'true' })
              )
            )
          );
        });
      }
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_BookForm2.default, {
          book: this.state.book,
          categories: this.props.categories }),
        _react2.default.createElement(
          'div',
          { className: 'btn-edit-add' },
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'a',
              { className: 'waves-effect waves-light btn modal-trigger', href: '#modal' },
              'AD BOOK'
            )
          )
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'table',
            { className: 'bordered centered admin-books' },
            _react2.default.createElement(
              'thead',
              null,
              _react2.default.createElement(
                'tr',
                null,
                _react2.default.createElement(
                  'th',
                  null,
                  'S/N'
                ),
                _react2.default.createElement(
                  'th',
                  null,
                  'Category'
                ),
                _react2.default.createElement(
                  'th',
                  null,
                  'Author'
                ),
                _react2.default.createElement(
                  'th',
                  null,
                  'Title'
                ),
                _react2.default.createElement(
                  'th',
                  null,
                  'Quantity'
                ),
                _react2.default.createElement('th', null),
                _react2.default.createElement('th', null)
              )
            ),
            _react2.default.createElement(
              'tbody',
              null,
              bookItems
            )
          )
        )
      );
    }
  }]);

  return AdminBooks;
}(_react2.default.Component);

AdminBooks.PropTypes = {
  bookItems: _propTypes2.default.object.isRequired,
  map: _propTypes2.default.func.isRequired
};

exports.default = AdminBooks;

/***/ })

})
//# sourceMappingURL=0.ab1504953b5f67c668d0.hot-update.js.map