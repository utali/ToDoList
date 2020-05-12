import React, {Fragment, Component} from 'react';
import {connect} from 'dva';
import { routerRedux } from 'dva/router';
import {
  Button,
  Form,
  Input,
  TimePicker
} from 'antd';
import moment from 'moment';
import styles from './IndexPage.css';
import {ArrowLeftOutlined} from '@ant-design/icons';

const FormItem = Form.Item;
const { TextArea } = Input;

@connect(({task}) => {
  task
})
export default class AddPage extends Component{

  //antd v4
  formRef = React.createRef();

  state = {
    colorList: [{
      color: 'red'
    }, {
      color: 'orange'
    }, {
      color: 'yellow'
    }, {
      color: 'green'
    }, {
      color: 'blue'
    },{
      color: 'purple'
    }, {
      color: 'gray'
    }],
  }

  //返回首页
  goBack = () => {
    console.log(this.props);
    this.props.dispatch(routerRedux.push('/'))
  }
  //保存任务
  save = () => {
    const { validateFields } = this.formRef.current;
    validateFields().then(values => {
      console.log(values);
    })
  };
  //切换任务标记
  selectedSign = (index) => {
    const { colorList } = this.state;
    colorList.map(item => item.action = false);
    colorList[index].action = true;
    this.setState({
      colorList
    })
  }

  render() {
    const { colorList } = this.state;
    const layout = {
      labelCol: {
        xs: 8, sm: 6, lg: 5, xl: 4, xxl: 3
      },
      wrapperCol: {
        xs: 16
      }
    }

    return <Fragment>
      <div className={styles.content_title}>添加任务
        <Button
          type="primary"
          icon={<ArrowLeftOutlined/>}
          onClick={this.goBack}
          style={{marginLeft: 10}}
        >返回</Button>
      </div>
      <Form
        {...layout}
        labelAlign='left'
        ref={this.formRef}
        style={{border: '1px solid #f0f0f0', padding: '10px 20px'}}
      >
        <FormItem name='sign' label='任务标记' className={styles.task_form}>
          {
            colorList.map((item, index) => <span
              onClick={() => this.selectedSign(index)}
              style={{backgroundColor: item.color}}
              className={item.action ? `${styles.color_dot} ${styles.action}` : styles.color_dot}/>)
          }
        </FormItem>
        <FormItem name='taskName' label='任务名称' rules={[{ required: true }]}>
          <Input/>
        </FormItem>
        <FormItem name='description' label='任务描述' rules={[{ required: true }]}>
          <TextArea rows={5} />
        </FormItem>
        <FormItem name='startTime' label='开始时间' rules={[{ required: true }]}>
          <TimePicker format="HH:mm"/>
        </FormItem>
        <FormItem name='endTime' label='结束时间' rules={[{ required: true }]}>
          <TimePicker format="HH:mm"/>
        </FormItem>
        <div style={{textAlign: 'center'}}>
          <Button type="primary" onClick={this.save}>保存</Button>
        </div>
      </Form>
    </Fragment>
  }
}

AddPage.propTypes = {};

