import React, {Fragment, Component} from 'react';
import {connect} from 'dva';
import {
  Button,
  Form,
  Input,
  TimePicker
} from 'antd';
import styles from './IndexPage.css';
import {ArrowLeftOutlined} from '@ant-design/icons';
import moment from 'moment';

const FormItem = Form.Item;
const { TextArea } = Input;

@connect(({task}) => ({
  task
}))
export default class AddPage extends Component{

  //antd v4
  formRef = React.createRef();

  state = {
    signValue: undefined
  }

  componentDidMount() {
    const { task: {taskRecord} } = this.props;
    if (taskRecord.sign !== undefined) {
      this.selectedSign(taskRecord.sign);
    }
  }
  componentWillUnmount() {
    this.selectedSign();
  }

  //返回首页
  goBack = () => {
    this.props.goBack();
  }
  //保存任务
  save = () => {
    const { validateFields } = this.formRef.current;
    const { signValue } = this.state;
    const { dispatch, task: { taskList, selectedDate, taskIndex } } = this.props;
    validateFields().then(values => {
      values.sign = signValue;
      let y = new Date(selectedDate).getFullYear();
      let m = new Date(selectedDate).getMonth();
      let d = new Date(selectedDate).getDate();
      values.time.year(y);
      values.time.month(m);
      values.time.date(d);
      values.time = values.time.valueOf();
      if (taskIndex !== undefined) {
        taskList[taskIndex] = values;
      } else {
        taskList.push(values);
      }
      dispatch({
        type: 'task/save',
        payload: {
          taskList: this.sortTask(taskList)
        }
      });
      this.goBack();
    })
  };
  //对任务列表进行排序
  sortTask = (list) => {
    if (list.length < 2) return list;
    return list.sort((a,b) => b.time - a.time)
  }
  //切换任务标记
  selectedSign = (index) => {
    const { task: {colorList} } = this.props;
    colorList.map(item => item.action = false);
    if (index === undefined) return;
    colorList[index].action = true;
    this.setState({
      colorList,
      signValue: index
    })
  }

  render() {
    const { task: { taskRecord, colorList } } = this.props;
    const layout = {
      labelCol: {
        xs: 8, sm: 6, lg: 5, xl: 4, xxl: 3
      },
      wrapperCol: {
        xs: 16
      }
    }

    return <Fragment>
      <div className={styles.content_title} style={{display: 'flex', alignItems: 'center'}}>添加任务
        <Button
          type="primary"
          icon={<ArrowLeftOutlined/>}
          onClick={this.goBack}
          style={{marginLeft: 10}}
        >返回</Button>
      </div>
      <Form
        {...layout}
        ref={this.formRef}
        style={{border: '1px solid #f0f0f0', padding: '10px 20px'}}
        initialValues={{
          taskName: taskRecord.taskName,
          description: taskRecord.description,
          time: taskRecord.time ? moment(taskRecord.time) : undefined
        }}
      >
        <FormItem label='任务标记' className={styles.task_form}>
          {
            colorList.map((item, index) => <span
              key={index}
              onClick={() => this.selectedSign(index)}
              style={{backgroundColor: item.color}}
              className={item.action ? `${styles.color_dot} ${styles.action}` : styles.color_dot}/>)
          }
        </FormItem>
        <FormItem name='taskName' label='任务名称' rules={[{ required: true }]}>
          <Input autoComplete='off'/>
        </FormItem>
        <FormItem name='description' label='任务描述' rules={[{ required: true }]}>
          <TextArea rows={4} autoComplete='off'/>
        </FormItem>
        <FormItem name='time' label='时间' rules={[{ required: true }]}>
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

