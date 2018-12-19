import styles from './index.css';
import React, { Component } from 'react';
import { Input } from 'antd';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  setData = (data) => (
      <div>
        {
          data.map(item => <div>{item}</div>)
        }
      </div>
  )

  render() {
    let {data} = this.props;
    return (
      <div>
        <Input placeholder="请输入需要匹配的类目" />
        {
          this.setData(data)
        }
      </div>
    )
  }
}
