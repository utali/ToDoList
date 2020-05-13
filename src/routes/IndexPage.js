import React, {Fragment, Component} from 'react';
import {connect} from 'dva';
import {
  Row,
  Col,
  Calendar
} from 'antd';
import styles from './IndexPage.css';
import AddPage from './AddPage';
import ListPage from './ListPage';

@connect(({task}) => {
  return {
    task
  }
})
export default class IndexPage extends Component {

  state = {
    listPage: true
  }

  //将任务标记为完成
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
  //选择日期改变
  onPanelChange = (value) => {
    this.props.dispatch({
      type: 'task/save',
      payload: {
        selectedDate: new Date(value.valueOf()).toLocaleDateString()
      }
    })
  }

  render() {
    const {listPage} = this.state;

    return <Fragment>
      <Row gutter={12}>
        <Col span={10} offset={1}>
          <div className={styles.content_title}>日历</div>
          <div className={styles.calendar_line}>
            <Calendar fullscreen={false} onPanelChange={this.onPanelChange}/>
          </div>
        </Col>
        <Col span={11} offset={1}>
          {
            listPage
              ? <ListPage
              listPage={listPage}
              goAddPage={() => this.setState({listPage: false})}
            />
            : <AddPage
                listPage={listPage}
                goBack={() => this.setState({listPage: true})}
              />
          }
        </Col>
      </Row>
    </Fragment>
  }
}

ListPage.propTypes = {};
