'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _row = require('antd/lib/row');

var _row2 = _interopRequireDefault(_row);

var _col = require('antd/lib/col');

var _col2 = _interopRequireDefault(_col);

var _button = require('antd/lib/button');

var _button2 = _interopRequireDefault(_button);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _form = require('antd/lib/form');

var _form2 = _interopRequireDefault(_form);

var _dec, _class; /**
                   * Created by panzilong on 2017/11/14.
                   */


require('antd/lib/row/style');

require('antd/lib/col/style');

require('antd/lib/button/style');

require('antd/lib/form/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./SearchWrap.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormItem = _form2.default.Item;

var SearchWrap = (_dec = _form2.default.create(), _dec(_class = function (_Component) {
  (0, _inherits3.default)(SearchWrap, _Component);

  function SearchWrap(props) {
    (0, _classCallCheck3.default)(this, SearchWrap);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SearchWrap.__proto__ || (0, _getPrototypeOf2.default)(SearchWrap)).call(this, props));

    _this.resetSearchParams = function () {
      var resetFields = _this.props.form.resetFields;

      resetFields();
    };

    _this.getSearchParams = function (e) {
      e.preventDefault();
      _this.props.form.validateFields(function (err, values) {
        if (!err) {
          console.log(values);
          _this.props.getSearchParams(values);
        } else {
          console.log(err, values);
        }
      });
    };

    return _this;
  }

  (0, _createClass3.default)(SearchWrap, [{
    key: 'componentWillMount',
    value: function componentWillMount() {}
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      // console.log(newProps);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var getFieldDecorator = this.props.form.getFieldDecorator;
      var children = this.props.children;
      // console.log(children);

      return _react2.default.createElement(
        'div',
        { className: 'search-wrap' },
        _react2.default.createElement(
          _row2.default,
          null,
          _react2.default.createElement(
            _col2.default,
            { span: 24, className: 'search-content' },
            _react2.default.createElement(
              _form2.default,
              { layout: 'inline', onSubmit: this.getSearchParams },
              children && children.map(function (item, index) {
                return _react2.default.createElement(
                  FormItem,
                  { label: item.props.label, key: item.props['data-name'] || index },
                  getFieldDecorator(item.props['data-name'] || 'name', {
                    rules: [{ required: item.props.required || false, message: ' ' }],
                    initialValue: _this2.props.params && _this2.props.params[item.props['data-name']] ? _this2.props.params[item.props['data-name']] : null
                  })(item)
                );
              }),
              _react2.default.createElement(
                'div',
                { className: 'search-button' },
                _react2.default.createElement(
                  _button2.default,
                  { type: 'primary', style: { left: '35%' }, size: 'large', htmlType: 'submit' },
                  '\u67E5 \u8BE2'
                ),
                _react2.default.createElement(
                  _button2.default,
                  { size: 'large', style: { left: '85%' }, onClick: this.resetSearchParams },
                  '\u91CD \u7F6E'
                )
              )
            )
          )
        )
      );
    }
  }]);
  return SearchWrap;
}(_react.Component)) || _class);
exports.default = SearchWrap;
module.exports = exports['default'];
//# sourceMappingURL=SearchWrap.js.map