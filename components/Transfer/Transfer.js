'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _button = require('antd/lib/button');

var _button2 = _interopRequireDefault(_button);

var _icon = require('antd/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

var _checkbox = require('antd/lib/checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _input = require('antd/lib/input');

var _input2 = _interopRequireDefault(_input);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

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

var _tree = require('antd/lib/tree');

var _tree2 = _interopRequireDefault(_tree);

require('antd/lib/button/style');

require('antd/lib/icon/style');

require('antd/lib/checkbox/style');

require('antd/lib/input/style');

require('antd/lib/tree/style');

var _index = require('./index.css');

var _index2 = _interopRequireDefault(_index);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TreeNode = _tree2.default.TreeNode;

var CarouselWrap = function (_Component) {
  (0, _inherits3.default)(CarouselWrap, _Component);

  function CarouselWrap(props) {
    (0, _classCallCheck3.default)(this, CarouselWrap);

    var _this = (0, _possibleConstructorReturn3.default)(this, (CarouselWrap.__proto__ || (0, _getPrototypeOf2.default)(CarouselWrap)).call(this, props));

    _this.setLeftData = function (data, checkedKeys) {
      var newData = data.map(function (item) {
        if (checkedKeys.indexOf(item[_this.props.config && _this.props.config.id || 'key']) !== -1) {
          return null;
        } else {
          if (item[_this.props.config && _this.props.config.children || 'children']) {
            item[_this.props.config && _this.props.config.children || 'children'] = _this.setLeftData(item[_this.props.config && _this.props.config.children || 'children'], checkedKeys);
          }
        }
        return item;
      });
      return newData.filter(function (item) {
        return item;
      });
    };

    _this.setRightData = function (data, checkedKeys, val, checkedRightKeys) {
      var newData = data.map(function (item) {
        var value = { num: 0 };
        if (checkedKeys.indexOf(item[_this.props.config && _this.props.config.id || 'key']) !== -1) {
          val && val.num++;
          return item;
        } else {
          if (item[_this.props.config && _this.props.config.children || 'children']) {
            item[_this.props.config && _this.props.config.children || 'children'] = _this.setRightData(item[_this.props.config && _this.props.config.children || 'children'], checkedKeys, value, checkedRightKeys);
            if (item[_this.props.config && _this.props.config.children || 'children'].length > 0) {
              val && val.num++;
            } else {
              item[_this.props.config && _this.props.config.children || 'children'] = null;
            }
          } else {
            return null;
          }
        }
        if (value.num !== 0) {
          checkedRightKeys && checkedRightKeys.push(item[_this.props.config && _this.props.config.id || 'key']);
        }
        if (value.num === 0) {
          return null;
        }
        return item;
      });
      return newData.filter(function (item) {
        return item;
      });
    };

    _this.onLeftExpand = function (expandedKeys) {
      console.log('onLeftExpand', expandedKeys);
      _this.setState({
        expandedLeftKeys: expandedKeys,
        autoExpandParentLeft: false
      });
    };

    _this.onLeftCheck = function (checkedKeys) {
      console.log('onLeftCheck', checkedKeys);
      _this.setState({ checkedLeftKeys: checkedKeys });
    };

    _this.onLeftSelect = function (selectedKeys, info) {
      console.log('onLeftSelect', info);
      _this.setState({ selectedLeftKeys: selectedKeys });
    };

    _this.onRightExpand = function (expandedKeys) {
      console.log('onRightExpand', expandedKeys);
      _this.setState({
        expandedRightKeys: expandedKeys,
        autoExpandParentRight: false
      });
    };

    _this.onRightCheck = function (checkedRightKeys) {
      console.log('onRightCheck', checkedRightKeys);
      _this.setState({ checkedRightKeys: checkedRightKeys });
    };

    _this.onRightSelect = function (selectedKeys, info) {
      console.log('onRightSelect', info);
      _this.setState({ selectedRightKeys: selectedKeys });
    };

    _this.onChangeInput = function (e) {
      console.log(e.target.value);
      var value = e.target.value;
      var leftData = _this.state.leftData;

      var checkedLeftKeys = [];
      clearTimeout(_this.time);
      _this.time = setTimeout(function () {
        var setKeys = function setKeys(data) {
          data.map(function (item) {
            if (item[_this.props.config && _this.props.config.name || 'title'].indexOf(value) !== -1) {
              checkedLeftKeys.push(item[_this.props.config && _this.props.config.id || 'key']);
            } else {
              if (item[_this.props.config && _this.props.config.children || 'children']) {
                setKeys(item[_this.props.config && _this.props.config.children || 'children']);
              }
            }
          });
        };
        setKeys(leftData);
        console.log(checkedLeftKeys);
        _this.setState({ checkedLeftKeys: checkedLeftKeys });
      }, 300);
    };

    _this.onChangeLeft = function (e) {
      console.log(e);
      var leftData = _this.state.leftData;

      var checkedLeftKeys = [];
      if (e.target.checked) {
        var setKeys = function setKeys(data) {
          data.map(function (item) {
            checkedLeftKeys.push(item[_this.props.config && _this.props.config.id || 'key']);
            if (item[_this.props.config && _this.props.config.children || 'children']) {
              setKeys(item[_this.props.config && _this.props.config.children || 'children']);
            }
          });
        };
        setKeys(leftData);
      }
      _this.setState({ checkedLeftKeys: checkedLeftKeys, checkedLeft: e.target.checked });
    };

    _this.onChangeRight = function (e) {
      var rightData = _this.state.rightData;

      var checkedRightKeys = [];
      if (e.target.checked) {
        var setKeys = function setKeys(data) {
          data.map(function (item) {
            checkedRightKeys.push(item[_this.props.config && _this.props.config.id || 'key']);
            if (item[_this.props.config && _this.props.config.children || 'children']) {
              setKeys(item[_this.props.config && _this.props.config.children || 'children']);
            }
          });
        };
        setKeys(rightData);
      }
      _this.setState({ checkedRightKeys: checkedRightKeys, checkedRight: e.target.checked });
    };

    _this.onClickLeft = function () {
      var _this$state = _this.state,
          checkedKeys = _this$state.checkedKeys,
          checkedRightKeys = _this$state.checkedRightKeys,
          rightData = _this$state.rightData;

      _this.setRightData(JSON.parse((0, _stringify2.default)(rightData)), JSON.parse((0, _stringify2.default)(checkedRightKeys)), null, checkedRightKeys);
      var checkedAllKeys = checkedKeys.filter(function (item) {
        return checkedRightKeys.indexOf(item) === -1;
      });
      var newRightData = _this.setRightData(JSON.parse((0, _stringify2.default)(_this.props.treeData || [])), checkedAllKeys);
      var leftData = _this.setLeftData(JSON.parse((0, _stringify2.default)(_this.props.treeData || [])), checkedAllKeys);

      console.log(newRightData, leftData);
      _this.setState({
        rightData: newRightData,
        leftData: leftData,
        checkedRightKeys: [],
        checkedRight: false,
        checkedKeys: checkedAllKeys
      });
    };

    _this.onClickRight = function () {
      var _this$state2 = _this.state,
          checkedLeftKeys = _this$state2.checkedLeftKeys,
          checkedKeys = _this$state2.checkedKeys;

      var checkedAllKeys = [].concat((0, _toConsumableArray3.default)(checkedLeftKeys), (0, _toConsumableArray3.default)(checkedKeys));
      console.log(checkedAllKeys);

      var rightData = _this.setRightData(JSON.parse((0, _stringify2.default)(_this.props.treeData || [])), checkedAllKeys);
      var leftData = _this.setLeftData(JSON.parse((0, _stringify2.default)(_this.props.treeData || [])), checkedAllKeys);

      console.log(rightData, leftData);
      _this.setState({
        rightData: rightData,
        leftData: leftData,
        checkedLeftKeys: [],
        checkedLeft: false,
        checkedKeys: checkedAllKeys
      });
    };

    _this.renderTreeNodes = function (data) {
      return data.map(function (item) {
        var _this$props$style = _this.props.style,
            style = _this$props$style === undefined ? { height: '400px', width: '300px', fontSize: '12px' } : _this$props$style;

        if (item[_this.props.config && _this.props.config.children || 'children']) {
          return _react2.default.createElement(
            TreeNode,
            { style: { fontSize: style.fontSize }, title: item[_this.props.config && _this.props.config.name || 'title'], key: item[_this.props.config && _this.props.config.id || 'key'] },
            _this.renderTreeNodes(item[_this.props.config && _this.props.config.children || 'children'])
          );
        }
        return _react2.default.createElement(TreeNode, { style: { fontSize: style.fontSize }, title: item[_this.props.config && _this.props.config.name || 'title'], key: item[_this.props.config && _this.props.config.id || 'key'] });
      });
    };

    _this.state = {
      expandedLeftKeys: [],
      autoExpandParentLeft: true,
      checkedLeftKeys: [],
      selectedLeftKeys: [],
      expandedRightKeys: [],
      autoExpandParentRight: true,
      checkedRightKeys: [],
      selectedRightKeys: [],
      checkedKeys: [],
      checkedLeft: false,
      checkedRight: false,
      rightData: [],
      leftData: _this.props.treeData || []
    };
    return _this;
  }

  (0, _createClass3.default)(CarouselWrap, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      if (newProps && newProps.treeData) {
        this.setState({ leftData: newProps.treeData });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          rightData = _state.rightData,
          leftData = _state.leftData,
          checkedLeft = _state.checkedLeft,
          checkedRight = _state.checkedRight;
      var _props$style = this.props.style,
          style = _props$style === undefined ? { height: '400px', width: '300px', fontSize: '12px' } : _props$style;

      return _react2.default.createElement(
        'div',
        { className: _index2.default.contentBox, style: { fontSize: style.fontSize } },
        _react2.default.createElement(
          'div',
          { className: _index2.default.inputBox },
          _react2.default.createElement(
            'div',
            null,
            '\u641C\u7D22\u76EE\u6807\u7C7B\u76EE\uFF1A'
          ),
          _react2.default.createElement(_input2.default, { onChange: this.onChangeInput, style: { fontSize: style.fontSize }, placeholder: '\u8BF7\u8F93\u5165\u9700\u8981\u5339\u914D\u7684\u7C7B\u76EE' })
        ),
        _react2.default.createElement(
          'div',
          { className: _index2.default.treeBox, style: style },
          _react2.default.createElement(
            'div',
            { className: _index2.default.checkbox },
            _react2.default.createElement(
              _checkbox2.default,
              { style: { fontSize: style.fontSize }, checked: checkedLeft, onChange: this.onChangeLeft },
              '\u5168\u9009'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: _index2.default.Tree, style: { height: parseInt(style.height) - 40 + 'px' } },
            _react2.default.createElement(
              _tree2.default,
              {
                checkable: true,
                defaultExpandAll: true,
                onExpand: this.onLeftExpand,
                expandedKeys: this.state.expandedLeftKeys,
                autoExpandParent: this.state.autoExpandParentLeft,
                onCheck: this.onLeftCheck,
                checkedKeys: this.state.checkedLeftKeys,
                onSelect: this.onLeftSelect,
                selectedKeys: this.state.selectedLeftKeys
              },
              this.renderTreeNodes(leftData)
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: _index2.default.conterBox, style: { height: style.height } },
          _react2.default.createElement(
            _button2.default,
            { className: _index2.default.left, size: 'small', type: 'primary', onClick: this.onClickLeft },
            _react2.default.createElement(_icon2.default, { type: 'left' })
          ),
          _react2.default.createElement(
            _button2.default,
            { className: _index2.default.right, size: 'small', type: 'primary', onClick: this.onClickRight },
            _react2.default.createElement(_icon2.default, { type: 'right' })
          )
        ),
        _react2.default.createElement(
          'div',
          { className: _index2.default.treeBox, style: style },
          _react2.default.createElement(
            'div',
            { className: _index2.default.checkbox },
            _react2.default.createElement(
              _checkbox2.default,
              { style: { fontSize: style.fontSize }, checked: checkedRight, onChange: this.onChangeRight },
              '\u5168\u9009'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: _index2.default.Tree, style: { height: parseInt(style.height) - 40 + 'px' } },
            _react2.default.createElement(
              _tree2.default,
              {
                checkable: true,
                defaultExpandAll: true,
                onExpand: this.onRightExpand,
                expandedKeys: this.state.expandedRightKeys,
                autoExpandParent: this.state.autoExpandParentRight,
                onCheck: this.onRightCheck,
                checkedKeys: this.state.checkedRightKeys,
                onSelect: this.onRightSelect,
                selectedKeys: this.state.selectedRightKeys
              },
              this.renderTreeNodes(rightData)
            )
          )
        )
      );
    }
  }]);
  return CarouselWrap;
}(_react.Component);

exports.default = CarouselWrap;
module.exports = exports['default'];
//# sourceMappingURL=Transfer.js.map