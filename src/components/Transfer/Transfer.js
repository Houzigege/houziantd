import styles from './index.css';
import React, { Component } from 'react';
import { Tree, Button, Icon, Checkbox, Input } from 'antd';
const { TreeNode } = Tree;

export default class CarouselWrap extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      leftData: this.props.treeData || [],
    }
  }


  componentWillReceiveProps(newProps) {
    if(newProps && newProps.treeData) {
      this.setState({leftData: newProps.treeData})
    }
  }

  setLeftData = (data, checkedKeys) => {
    let newData = data.map(item => {
      if(checkedKeys.indexOf(item[this.props.config && this.props.config.id || 'key']) !== -1) {
        return null;
      } else {
        if(item[this.props.config && this.props.config.children || 'children']) {
          item[this.props.config && this.props.config.children || 'children'] = this.setLeftData(item[this.props.config && this.props.config.children || 'children'], checkedKeys);
        }
      }
      return item;
    });
    return newData.filter(item => item);
  };

  setRightData = (data, checkedKeys, val, checkedRightKeys) => {
    let newData = data.map(item => {
      let value = {num: 0};
      if(checkedKeys.indexOf(item[this.props.config && this.props.config.id || 'key']) !== -1){
        val && val.num ++;
        return item;
      } else {
        if (item[this.props.config && this.props.config.children || 'children']) {
          item[this.props.config && this.props.config.children || 'children'] = this.setRightData(item[this.props.config && this.props.config.children || 'children'], checkedKeys, value, checkedRightKeys);
          if(item[this.props.config && this.props.config.children || 'children'].length > 0) {
            val && val.num ++;
          } else {
            item[this.props.config && this.props.config.children || 'children'] = null;
          }
        } else {
          return null;
        }
      }
      if(value.num !== 0) {
        checkedRightKeys && checkedRightKeys.push(item[this.props.config && this.props.config.id || 'key']);
      }
      if(value.num === 0) {
        return null;
      }
      return item;
    });
    return newData.filter(item => item);
  };


  onLeftExpand = (expandedKeys) => {
    console.log('onLeftExpand', expandedKeys);
    this.setState({
      expandedLeftKeys: expandedKeys,
      autoExpandParentLeft: false,
    });
  };

  onLeftCheck = (checkedKeys) => {
    console.log('onLeftCheck', checkedKeys);
    this.setState({ checkedLeftKeys: checkedKeys });
  };

  onLeftSelect = (selectedKeys, info) => {
    console.log('onLeftSelect', info);
    this.setState({ selectedLeftKeys: selectedKeys });
  };

  onRightExpand = (expandedKeys) => {
    console.log('onRightExpand', expandedKeys);
    this.setState({
      expandedRightKeys: expandedKeys,
      autoExpandParentRight: false,
    });
  };

  onRightCheck = (checkedRightKeys) => {
    console.log('onRightCheck', checkedRightKeys);
    this.setState({ checkedRightKeys });
  };

  onRightSelect = (selectedKeys, info) => {
    console.log('onRightSelect', info);
    this.setState({ selectedRightKeys: selectedKeys });
  };

  onChangeInput = (e) => {
    console.log(e.target.value);
    let value = e.target.value;
    let {leftData} = this.state;
    let checkedLeftKeys = [];
    clearTimeout(this.time);
    this.time = setTimeout(() => {
      let setKeys = (data) => {
        data.map(item => {
          if(item[this.props.config && this.props.config.name || 'title'].indexOf(value) !== -1) {
            checkedLeftKeys.push(item[this.props.config && this.props.config.id || 'key']);
          } else {
            if(item[this.props.config && this.props.config.children || 'children']) {
              setKeys(item[this.props.config && this.props.config.children || 'children']);
            }
          }
        })
      };
      setKeys(leftData);
      console.log(checkedLeftKeys);
      this.setState({ checkedLeftKeys });
    }, 300);
  };

  onChangeLeft = (e) => {
    console.log(e);
    let {leftData} = this.state;
    let checkedLeftKeys = [];
    if(e.target.checked) {
      let setKeys = (data) => {
        data.map(item => {
          checkedLeftKeys.push(item[this.props.config && this.props.config.id || 'key']);
          if(item[this.props.config && this.props.config.children || 'children']) {
            setKeys(item[this.props.config && this.props.config.children || 'children']);
          }
        })
      };
      setKeys(leftData);
    }
    this.setState({ checkedLeftKeys,  checkedLeft: e.target.checked });
  };

  onChangeRight = (e) => {
    let {rightData} = this.state;
    let checkedRightKeys = [];
    if(e.target.checked) {
      let setKeys = (data) => {
        data.map(item => {
          checkedRightKeys.push(item[this.props.config && this.props.config.id || 'key']);
          if(item[this.props.config && this.props.config.children || 'children']) {
            setKeys(item[this.props.config && this.props.config.children || 'children']);
          }
        })
      };
      setKeys(rightData);
    }
    this.setState({ checkedRightKeys, checkedRight: e.target.checked });
  };

  onClickLeft = () => {
    let {checkedKeys, checkedRightKeys, rightData} = this.state;
    this.setRightData(JSON.parse(JSON.stringify(rightData)), JSON.parse(JSON.stringify(checkedRightKeys)), null, checkedRightKeys);
    let checkedAllKeys = checkedKeys.filter(item => checkedRightKeys.indexOf(item) === -1);
    let newRightData = this.setRightData(JSON.parse(JSON.stringify(this.props.treeData || [])), checkedAllKeys);
    let leftData = this.setLeftData(JSON.parse(JSON.stringify(this.props.treeData || [])), checkedAllKeys);

    console.log(newRightData, leftData);
    this.setState({
      rightData: newRightData,
      leftData,
      checkedRightKeys: [],
      checkedRight: false,
      checkedKeys: checkedAllKeys
    });

  };

  onClickRight = () => {
    let {checkedLeftKeys, checkedKeys} = this.state;
    let checkedAllKeys = [...checkedLeftKeys, ...checkedKeys]
    console.log(checkedAllKeys);

    let rightData = this.setRightData(JSON.parse(JSON.stringify(this.props.treeData || [])), checkedAllKeys);
    let leftData = this.setLeftData(JSON.parse(JSON.stringify(this.props.treeData || [])), checkedAllKeys);

    console.log(rightData, leftData);
    this.setState({
      rightData,
      leftData,
      checkedLeftKeys: [],
      checkedLeft: false,
      checkedKeys: checkedAllKeys
    });

  };

  renderTreeNodes = data => data.map((item) => {
    let {style = {height: '400px', width: '300px', fontSize: '12px'}} = this.props;
    if (item[this.props.config && this.props.config.children || 'children']) {
      return (
        <TreeNode style={{fontSize: style.fontSize}} title={item[this.props.config && this.props.config.name || 'title']} key={item[this.props.config && this.props.config.id || 'key']}>
          {this.renderTreeNodes(item[this.props.config && this.props.config.children || 'children'])}
        </TreeNode>
      );
    }
    return <TreeNode style={{fontSize: style.fontSize}} title={item[this.props.config && this.props.config.name || 'title']} key={item[this.props.config && this.props.config.id || 'key']} />;
  });

  render() {
    let {rightData, leftData, checkedLeft, checkedRight} = this.state;
    let {style = {height: '400px', width: '300px', fontSize: '12px'}} = this.props;
    return (
      <div className={styles.contentBox} style={{fontSize: style.fontSize}}>
        <div className={styles.inputBox}>
          <div>搜索目标类目：</div>
          <Input onChange={this.onChangeInput} style={{fontSize: style.fontSize}} placeholder="请输入需要匹配的类目" />
        </div>
        <div className={styles.treeBox} style={style}>
          <div className={styles.checkbox}>
            <Checkbox style={{fontSize: style.fontSize}} checked={checkedLeft} onChange={this.onChangeLeft}>全选</Checkbox>
          </div>
          <div className={styles.Tree} style={{height: `${parseInt(style.height) - 40}px`}}>
            <Tree
              checkable
              defaultExpandAll
              onExpand={this.onLeftExpand}
              expandedKeys={this.state.expandedLeftKeys}
              autoExpandParent={this.state.autoExpandParentLeft}
              onCheck={this.onLeftCheck}
              checkedKeys={this.state.checkedLeftKeys}
              onSelect={this.onLeftSelect}
              selectedKeys={this.state.selectedLeftKeys}
            >
              {this.renderTreeNodes(leftData)}
            </Tree>
          </div>
        </div>
        <div className={styles.conterBox} style={{height: style.height}}>
          <Button className={styles.left} size="small" type="primary" onClick={this.onClickLeft}>
            <Icon type="left" />
          </Button>
          <Button className={styles.right} size="small" type="primary" onClick={this.onClickRight}>
            <Icon type="right" />
          </Button>
        </div>
        <div className={styles.treeBox} style={style}>
          <div className={styles.checkbox}>
            <Checkbox style={{fontSize: style.fontSize}} checked={checkedRight} onChange={this.onChangeRight}>全选</Checkbox>
          </div>
          <div className={styles.Tree} style={{height: `${parseInt(style.height) - 40}px`}}>
            <Tree
              checkable
              defaultExpandAll
              onExpand={this.onRightExpand}
              expandedKeys={this.state.expandedRightKeys}
              autoExpandParent={this.state.autoExpandParentRight}
              onCheck={this.onRightCheck}
              checkedKeys={this.state.checkedRightKeys}
              onSelect={this.onRightSelect}
              selectedKeys={this.state.selectedRightKeys}
            >
              {this.renderTreeNodes(rightData)}
            </Tree>
          </div>
        </div>
      </div>
    )
  }
}
