/**
 * Created by panzilong on 2017/11/14.
 */
import React, { Component } from 'react';
import { Row, Col, Button, Form, Input } from 'antd';
import './SearchWrap.css';
const FormItem = Form.Item;

@Form.create()
export default class SearchWrap extends Component {
    constructor(props) {
        super(props);

    }

    componentWillMount(){

    }


    componentWillReceiveProps(newProps){
      // console.log(newProps);
    }

    resetSearchParams = () => {
      const {resetFields} = this.props.form;
      resetFields();
    };

    getSearchParams = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values)=>{
        if(!err){
          console.log(values)
          this.props.getSearchParams(values);
        } else {
          console.log(err, values)
        }
      })
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const {children} = this.props;
        // console.log(children);
        return (
            <div className="search-wrap">
                <Row>
                    <Col span={24} className="search-content">
                        <Form layout="inline" onSubmit={this.getSearchParams} >
                          {
                            children && children.map((item, index) => (
                              <FormItem label={item.props.label} key={item.props['data-name'] || index}>
                                {getFieldDecorator(item.props['data-name'] || 'name', {
                                  rules: [{ required: item.props.required || false, message: ' ' }],
                                  initialValue: this.props.params && this.props.params[item.props['data-name']] ? this.props.params[item.props['data-name']] : null
                                })(
                                  item
                                )}
                              </FormItem>
                            ))
                          }
                          <div className="search-button">
                            <Button type="primary" style={{left: '35%'}} size="large" htmlType="submit">查 询</Button>
                            <Button size="large" style={{left: '85%'}} onClick={this.resetSearchParams}>重 置</Button>
                          </div>
                        </Form>
                    </Col>
                </Row>
            </div>
        )
    }
}
