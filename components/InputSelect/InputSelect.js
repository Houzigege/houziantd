'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _input = require('antd/lib/input');

var _input2 = _interopRequireDefault(_input);

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

require('antd/lib/input/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('./style/select_css.css');

var InputSelectWrap = function (_Component) {
  (0, _inherits3.default)(InputSelectWrap, _Component);

  function InputSelectWrap(props) {
    (0, _classCallCheck3.default)(this, InputSelectWrap);

    var _this = (0, _possibleConstructorReturn3.default)(this, (InputSelectWrap.__proto__ || (0, _getPrototypeOf2.default)(InputSelectWrap)).call(this, props));

    _this.handlerFocus = function () {
      var flag = _this.state.flag;

      _this.setState({ flag: !flag });
    };

    _this.handlerBlur = function () {
      _this.valueName = '';
      setTimeout(function () {
        return _this.setState({ flag: false });
      }, 100);
    };

    _this.handlerChange = function (e) {
      var flag = _this.state.flag;

      _this.valueName = e.target.value;
      var value = {
        id: null,
        name: e.target.value
      };
      if (!flag) {
        _this.setState({ flag: true });
      }
      _this.props.onChange(value);
    };

    _this.handlerClick = function (e) {
      var value = {
        id: e.target.id,
        name: e.target.innerHTML
      };
      _this.props.onChange(value);
    };

    _this.state = {
      flag: false
    };
    _this.valueName = '';
    return _this;
  }

  (0, _createClass3.default)(InputSelectWrap, [{
    key: 'componentWillMount',
    value: function componentWillMount() {}

    //获取焦点


    //鼠标移开


    //获取输入的value值


    //下拉选择

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var flag = this.state.flag;
      var _props = this.props,
          dataSource = _props.dataSource,
          disabled = _props.disabled,
          type = _props.type,
          placeholder = _props.placeholder;

      var value = this.props.value ? this.props.value : null;
      var valueId = value && value.id || 'A999B';
      var data = dataSource ? dataSource.filter(function (item) {
        return item[type && (type.name || type.enName) || 'name'].indexOf(_this2.valueName) !== -1;
      }) : [];
      var style = this.props.style || {};
      style.minHeight = '32px';
      // console.log(this.props);
      return _react2.default.createElement(
        'div',
        { className: 'select-box-content' },
        _react2.default.createElement(_input2.default, {
          style: style,
          size: 'large',
          defaultValue: null,
          placeholder: placeholder || "请输入",
          disabled: disabled ? disabled : false,
          value: value && value.name ? value.name : value && value.id ? dataSource.filter(function (item) {
            return item[type && type.id || 'id'] == value.id;
          })[0] ? dataSource.filter(function (item) {
            return item[type && type.id || 'id'] == value.id;
          })[0][type && type.name || 'name'] : null : null,
          onClick: this.handlerFocus,
          onBlur: this.handlerBlur,
          onChange: function onChange(e) {
            return _this2.handlerChange(e);
          }
        }),
        data && data.length > 0 ? _react2.default.createElement(
          'div',
          {
            className: 'select-box-content-box',
            style: { maxHeight: flag ? '250px' : 0, width: style.width || '100%', top: style.height && parseInt(style.height) < 32 ? '34px' : parseInt(style.height) + 2 + 'px' }
          },
          _react2.default.createElement(
            'ul',
            { className: 'select-box-content-ul' },
            data.map(function (item, index) {
              return _react2.default.createElement(
                'li',
                {
                  className: valueId == item[type && type.id || 'id'] ? 'select-dropdown-menu-item-selected' : 'select-dropdown-menu-item',
                  key: index + 'A321',
                  id: item[type && type.id || 'id'],
                  onClick: function onClick(e) {
                    return _this2.handlerClick(e);
                  },
                  title: item[type && type.name || 'name']
                },
                item[type && type.name || 'name']
              );
            })
          )
        ) : null
      );
    }
  }]);
  return InputSelectWrap;
}(_react.Component);

exports.default = InputSelectWrap;
module.exports = exports['default'];
//# sourceMappingURL=InputSelect.js.map