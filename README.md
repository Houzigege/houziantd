# houziantd
houziantd是基于antd创建的组件库。
此组件可用于快速搭建页面


##下载组件
```bash
$ npm  install  houziantd
```


## 使用方法
```bash
    import React, { Component } from 'react';
    import { App } from 'houziantd/components';

    export default class CarouselWrap extends Component {
      constructor(props) {
        super(props);
      }

      render() {
        return (
          <div>
            <App />
          </div>
        )
      }
    }
```
