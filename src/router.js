import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import zhCN from 'antd/es/locale/zh_CN';
import {ConfigProvider} from "antd";
import styles from "./routes/IndexPage.css";

function RouterConfig({ history }) {
  return (
    <ConfigProvider locale={zhCN}>
      <div style={{padding: '0px 20px'}}>
        <div className={styles.normal}>
          <div className={styles.title}>TO DO LIST</div>
        </div>
        <Router history={history}>
          <Switch>
            <Route path="/" exact component={IndexPage} />
          </Switch>
        </Router>
      </div>
    </ConfigProvider>
  );
}

export default RouterConfig;
