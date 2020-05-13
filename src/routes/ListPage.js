/** create by liqiaoqiao 2020-05-13 */

import React, {Fragment, Component} from 'react';
import {connect} from 'dva';
import {
  Timeline,
  Button,
  Affix,
  Tooltip,
  Popconfirm
} from 'antd';
import moment from 'moment';
import styles from './IndexPage.css';
import {
  ClockCircleOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';

@connect(({task}) => {
  return {
    task
  }
})
export default class ListPage extends Component {

  state = {}

  /**@description 点击添加任务
   */
  addTask = () => {
    this.props.goAddPage();
  }
  /**@description 删除任务
   * @param index 需要删除的任务下标
   */
  remove = (index) => {
    const { dispatch, task: { taskList } } = this.props;
    taskList.splice(index, 1);
    dispatch({
      type: 'task/save',
      payload: {
        taskList
      }
    })
  }
  /**@description 编辑任务
   * @param index 需要编辑的任务下标
   */
  edit = (index) => {
    const { dispatch, task: { taskList } } = this.props;
    dispatch({
      type: 'task/save',
      payload: {
        taskRecord: taskList[index],
        taskIndex: index
      }
    });
    this.addTask()
  }
  /**@description 将任务标记为完成
   * @param index 需要标记的任务下标
   */
  completed = (index) => {
    const { dispatch, task: { taskList } } = this.props;
    taskList[index].completed = true;
    dispatch({
      type: 'task/save',
      payload: {
        taskList
      }
    });
  }

  render() {
    let {task: {taskList, colorList, selectedDate}} = this.props;
    taskList = taskList.filter(item => new Date(item.time).toLocaleDateString() === selectedDate );
    return <Fragment>
      <div className={styles.content_title}>任务列表</div>
      <div className={styles.right_line}>
        <Timeline>
          {
            taskList.length === 0 && <div>尚未添加任务</div>
          }
          {
            taskList.map((item, index) => {
              return <Fragment key={index}>
                {
                  item.completed
                    ? <Timeline.Item
                      color='grey'
                    >
                      <div style={{color: 'lightGrey'}}>
                    <span style={{marginRight: 10}}>
                     {
                       moment(item.time).format('HH:mm')
                     }
                    </span>
                        <span style={{marginRight: 10}}>
                      {item.taskName}
                    </span>
                        <span>
                      <Tooltip title="删除">
                        <a style={{marginRight: 10}} onClick={() => this.remove(index)}>
                          <DeleteOutlined/>
                        </a>
                      </Tooltip>
                    </span>
                        <div style={{color: 'lightGrey', fontSize: 13, marginTop: 10}}>描述：{item.description}</div>
                      </div>
                    </Timeline.Item>
                    : <Timeline.Item
                      key={index}
                      color={colorList[item.sign] !== undefined ? colorList[item.sign].color : 'blue'}
                      dot={<ClockCircleOutlined className="timeline-clock-icon"/>}
                    >
                      <div>
                  <span style={{marginRight: 10}}>
                   {
                     moment(item.time).format('HH:mm')
                   }
                  </span>
                        <span style={{marginRight: 10}}>
                    {item.taskName}
                  </span>
                        <span>
                    <Tooltip title="完成" onClick={() => this.completed(index)}>
                      <a style={{marginRight: 10}}>
                        <CheckCircleOutlined/>
                      </a>
                    </Tooltip>
                    <Tooltip title="修改">
                      <a style={{marginRight: 10}} onClick={() => this.edit(index)}>
                        <EditOutlined/>
                      </a>
                    </Tooltip>
                    <Tooltip title="删除">
                      <Popconfirm
                        title="确认要删除该条任务？"
                        onConfirm={() => this.remove(index)}
                      >
                        <a style={{marginRight: 10}}>
                        <DeleteOutlined/>
                      </a>
                      </Popconfirm>

                    </Tooltip>
                  </span>
                        <div style={{color: 'grey', fontSize: 13, marginTop: 10}}>描述：{item.description}</div>
                      </div>
                    </Timeline.Item>
                }
              </Fragment>
            }
            )
          }
        </Timeline>
      </div>
      {
        new Date(selectedDate).getTime() >= new Date(new Date().toLocaleDateString()).getTime() &&
        <Affix offsetBottom={120}>
          <Button
            type="primary"
            icon={<PlusOutlined/>}
            style={{float: "right", marginRight: '10%'}}
            onClick={this.addTask}
          >添加任务</Button>
        </Affix>
      }

    </Fragment>
  }
}

ListPage.propTypes = {};
