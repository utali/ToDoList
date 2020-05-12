import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import AddPage from './routes/AddPage';
import zhCN from 'antd/es/locale/zh_CN';
import {Calendar, Col, ConfigProvider, Row, Timeline} from "antd";
import styles from "./routes/IndexPage.css";
import history from 'history/'
import moment from "moment";

function RouterConfig({ history }) {
  //选择日期改变
  function onPanelChange(value, mode) {
    console.log(value, mode);
  }

  return (
    <ConfigProvider locale={zhCN}>
      <div style={{padding: '0px 20px'}}>
        <div className={styles.normal}>
          <div className={styles.title}>TO DO LIST</div>
        </div>
        <Row gutter={12}>
          <Col span={10} offset={1}>
            <div className={styles.content_title}>日历</div>
            <div className={styles.calendar_line}>
              <Calendar fullscreen={false} onPanelChange={onPanelChange}/>
            </div>
          </Col>
          <Col span={11} offset={1}>
            <Router history={history}>
              <Switch>
                <Route path="/" exact component={IndexPage} />
                <Route path="/add" exact component={AddPage} />
              </Switch>
            </Router>
          </Col>
        </Row>
      </div>
    </ConfigProvider>
  );
}

export default RouterConfig;
