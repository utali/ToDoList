import React, {Fragment} from 'react';
import {connect} from 'dva';
import { routerRedux } from 'dva/router';
import {
  Calendar,
  Row,
  Col,
  Timeline,
  Button,
  Affix
} from 'antd';
import moment from 'moment';
import styles from './IndexPage.css';
import {ClockCircleOutlined, PlusOutlined} from '@ant-design/icons';

let list = [
  {
    content: [
      'Create a services site34',
      'Create a services sitedfsdfsdf',
      'Create a services sitegjhkghjgh'
    ],
    deadline: '2015-09-01 12:00'
  },
  {
    content: [
      'Create a services site34',
      'Create a services sitedfsdfsdf',
      'Create a services sitegjhkghjgh'
    ],
    deadline: '2015-09-01 13:15'
  },
  {
    content: [
      'Create a services site34',
      'Create a services sitedfsdfsdf',
      'Create a services sitegjhkghjgh'
    ],
    deadline: '2015-09-01 15:59'
  }
];

const IndexPage = ({dispatch}) => {
  //点击添加任务
  function addTask() {
    dispatch(routerRedux.push('/add'))
  }

  return <Fragment>
    <div className={styles.content_title}>任务列表</div>
    <div className={styles.right_line}>
      <Timeline>
        {
          list.map((item, index) =>
            <Timeline.Item
              color="green"
              dot={<ClockCircleOutlined className="timeline-clock-icon"/>}
            >
              <div style={{marginBottom: 10}}>
                {
                  moment(item.deadline).format('HH:mm')
                }
              </div>
              {
                item.content.map((item, index) => <div style={{marginBottom: 5}}>
                  {item}
                </div>)
              }
            </Timeline.Item>)
        }
      </Timeline>
    </div>
    <Affix offsetBottom={120}>
      <Button
        type="primary"
        icon={<PlusOutlined/>}
        style={{float: "right", marginRight: '10%'}}
        onClick={addTask}
      >添加任务</Button>
    </Affix>
  </Fragment>
}

IndexPage.propTypes = {};

export default connect()(IndexPage);
